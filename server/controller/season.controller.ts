import { Request } from 'express';
import { SeasonMetadata, SeasonsList } from '../model/season.model';
import { logger } from '../logger';
import { JSDOM } from 'jsdom';

// TODO: figure out a better way to use log path
// TODO: better types for HTML elements and text returned from those elements
//   so as to minimize the 'string | null | undefined' stuff
const LOG_PATH ='[SeasonController::getSeasonsHandler]';

export async function getSeasonsHandler(req: Request): Promise<SeasonsList> {
  try {
    // fetch HTML from j-archive seasons list page
    const response: Response = await fetch('https://j-archive.com/listseasons.php');
    const body: string = await response.text();
    logger.info(`${LOG_PATH} Season List HTML Fetched:`);
    logger.info(`${LOG_PATH}` + body);

    // parse HTML and extract season metadata
    const dom: JSDOM = new JSDOM(body);
    // Grab table of seasons
    const table: HTMLTableElement | null = dom.window.document.querySelector('table');
    if (!table) {
      logger.error(`${LOG_PATH} Could not find table element`);
      throw new Error(`${LOG_PATH} Could not find table element`);
    }

    // Grab a collection of rows from the table
    const tableRows: HTMLCollectionOf<HTMLTableRowElement> | undefined = table.rows;
    if (!tableRows) {
      logger.error(`${LOG_PATH} Could not find rows in table`);
      throw new Error(`${LOG_PATH} Could not find rows in table`);
    }

    // Iterate over each row in the table and build SeasonsList object
    let seasonsList: SeasonsList = {
      seasons: [],
    };

    for (let i = 0; i < tableRows.length; i++) {
      const row: HTMLTableRowElement = tableRows[i];
      const cells: HTMLCollectionOf<HTMLTableCellElement> = row.cells;

      let seasonURL: string | null | undefined; 
      let seasonName: string | null | undefined;
      let startDate: Date = new Date();  // TODO: do we need to default this?
      let endDate: Date = new Date();    // TODO: do we need to default this?
      let episodeCount: number | null | undefined;

      for (let j = 0; j < cells.length; j++) {
        const cell: HTMLTableCellElement = cells[j];
        if (j === 0) {
          const linkElement: HTMLAnchorElement | null = cell.querySelector('a');
          seasonURL = linkElement?.getAttribute('href');
          seasonName = linkElement?.textContent;
          if (!seasonURL || !seasonName) {
            logger.error(`${LOG_PATH} Could not find season URL or season name for table element (${i}, ${j})`);
            break;
          }
        }
        if (j === 1) {
          const dateText: string | null = cell.textContent;
          if (!dateText) {
            logger.error(`${LOG_PATH} Could not find date text for table element (${i}, ${j})`);
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
            logger.error(`${LOG_PATH} Could not find episode count for table element (${i}, ${j})`);
            break;
          }
          const episodeCountParts: string[] = episodeCountText.split(' ');
          episodeCount = parseInt(episodeCountParts[0].substring(1));
        }
      }
      
      if (seasonURL && seasonName && episodeCount) {
        const seasonMetadata: SeasonMetadata = {
          seasonUrl: seasonURL,
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
    logger.error(error);
    throw error;
  }
}

