import { SeasonMetadata, SeasonsList, Season, EpisodeMetadata } from '../model/season.model';
import { logger } from '../logger';
import { JSDOM } from 'jsdom';
import { config } from '../config';

// TODO: better types for HTML elements and text returned from those elements
//   so as to minimize the 'string | null | undefined' stuff

const LOG_MODULE = 'season.controller';


/*
 * getSeasons - fetches a list of all seasons from j-archive
 * Input: none
 * Output [SeasonsList] - list of seasons with metadata
 */
export async function getSeasons(): Promise<SeasonsList> {
  const log = logger.child({ 
    module: LOG_MODULE, 
    method: 'getSeasons' 
  });

  try {
    // fetch HTML from j-archive seasons list page
    const response: Response = await fetch(`${config.jArchiveBaseUrl}listseasons.php`);
    const body: string = await response.text();
    log.info(`Season List HTML Fetched:`);
    log.info(body);

    // get rows of table from HTML body containing season info
    const tableRows = tableParseHelper(body);

    // Iterate over each row in the table and build SeasonsList object
    let seasonsList: SeasonsList = {
      seasons: [],
    };

    for (let i = 0; i < tableRows.length; i++) {
      const row: HTMLTableRowElement = tableRows[i];
      const cells: HTMLCollectionOf<HTMLTableCellElement> = row.cells;

      let seasonId: string | null | undefined; 
      let seasonName: string | null | undefined;
      let startDate: Date = new Date();  // TODO: do we need to default this?
      let endDate: Date = new Date();    // TODO: do we need to default this?
      let episodeCount: number | null | undefined;

      for (let j = 0; j < cells.length; j++) {
        const cell: HTMLTableCellElement = cells[j];
        if (j === 0) {
          const linkElement: HTMLAnchorElement | null = cell.querySelector('a');
          const seasonUrl = linkElement?.getAttribute('href');
          seasonName = linkElement?.textContent;
          if (!seasonUrl || !seasonName) {
            log.error(`Could not find season URL or season name for table element (${i}, ${j})`);
            break;
          }
          // TODO: improper index check
          seasonId = seasonUrl.split('=')[1];
        }
        if (j === 1) {
          const dateText: string | null = cell.textContent;
          if (!dateText) {
            log.error(`Could not find date text for table element (${i}, ${j})`);
            break;
          }
          // TODO: make sure no improper indexing
          const dateParts: string[] = dateText.split(' to ');
          startDate = new Date(dateParts[0]);
          endDate = new Date(dateParts[1]);
        }
        if (j === 2) {
          const episodeCountText: string | null = cell.textContent;
          if (!episodeCountText) {
            log.error(`Could not find episode count for table element (${i}, ${j})`);
            break;
          }
          const episodeCountParts: string[] = episodeCountText.split(' ');
          episodeCount = parseInt(episodeCountParts[0].substring(1));
        }
      }
      
      // 
      if (seasonId && seasonName && episodeCount) {
        const seasonMetadata: SeasonMetadata = {
          seasonId: seasonId,
          seasonName: seasonName,
          startDate: startDate,
          endDate: endDate,
          episodeCount: episodeCount,
        };
        seasonsList.seasons.push(seasonMetadata);
      }
    }
    return seasonsList;
  } catch (error: any) {
    log.error(error);
    throw error;
  }
}



/*
 * getSeasonById - fetches a specific season by ID from j-archive
 * Input [string] - id of season to fetch
 * Output [Season] - season object containing metadata and episodes
 */
export async function getSeasonById(id: string): Promise<Season> {
  const log = logger.child({ 
    module: LOG_MODULE,
    method: 'getSeasonById'
  });

  try {
    // fetch HTML from j-archive specific season page
    const response: Response = await fetch(`${config.jArchiveBaseUrl}showseason.php?season=${id}`);
    const body: string = await response.text();
    log.info(`Season ${id} HTML Fetched by ID:`);
    log.info(body);

    // grab season title
    const dom = new JSDOM(body);
    const seasonTitle = dom.window.document.querySelector('h2')?.textContent;

    const tableRows = tableParseHelper(body);

    // Iterate over each row in the table and build Season object
    let episodeList: EpisodeMetadata[] = [];

    for (let i = 0; i < tableRows.length; i++) {
      const row: HTMLTableRowElement = tableRows[i];
      const cells: HTMLCollectionOf<HTMLTableCellElement> = row.cells;

      let episodeId: string | undefined;
      let episodeNumber: string | undefined;
      let airDate: Date = new Date();
      let contestants: string | undefined;
      let note: string | null | undefined;

      for (let j = 0; j < cells.length; j++) {
        const cell: HTMLTableCellElement = cells[j];
        // get episode ID, number, and air date
        if (j === 0) {
          const linkElement: HTMLAnchorElement | null = cell.querySelector('a');
          const episodeUrl = linkElement?.getAttribute('href');
          const linkContent = linkElement?.innerHTML;

          if (!episodeUrl || !linkContent) {
            log.error(`Could not find episode URL or episode number for table element (${i}, ${j})`);
            break;
          }

          episodeId = episodeUrl.split('=')[1];
          const linkContentSplit = linkContent.split(', aired&nbsp;');

          // TODO: check that the split has a length of at least 2 for proper indexing
          airDate = new Date(linkContentSplit[1]);
          episodeNumber = linkContentSplit[0].substring(1);
        }
        // get contestants
        if (j === 1) {
          const contestantsText: string | null = cell.textContent;
          if (!contestantsText) {
            log.error(`Could not find contestants for table element (${i}, ${j})`);
            break;
          }
          contestants = contestantsText.trim();
        }
        // get notes
        if (j === 2) {
          note = cell.textContent?.trim();
        }
      }
          
      if (episodeId && episodeNumber && contestants) {
        episodeList.push({
          id: episodeId,
          number: episodeNumber,
          airDate: airDate,
          contestants: contestants,
          note: note || '',
        });
      }
    }

    return {
      episodes: episodeList,
      name: seasonTitle || '',
    }
  }
  catch (error: any) {
    log.error(error);
    throw error;
  }
}


/* 
 * tableParseHelper - returns collection of rows from first table in HTML
 * Input [string] - string of HTML to parse
 * Output [HTMLCollectionOf<HTMLTableRowElement>] - collection of rows
 */
function tableParseHelper(htmlBody: string): HTMLCollectionOf<HTMLTableRowElement> {
  const log = logger.child({ 
    module: LOG_MODULE,
    method: 'tableParseHelper'
  });
  
  // parse HTML
  const dom: JSDOM = new JSDOM(htmlBody);
  // Grab table from HTML
  const table: HTMLTableElement | null = dom.window.document.querySelector('table');
  if (!table) {
    log.error(`Could not find table element`);
    throw new Error(`Could not find table element`);
  }

  // Grab a collection of rows from the table to return
  const tableRows: HTMLCollectionOf<HTMLTableRowElement> | undefined = table.rows;
  if (!tableRows) {
    log.error(`Could not find rows in table`);
    throw new Error(`Could not find rows in table`);
  }

  return tableRows;
}