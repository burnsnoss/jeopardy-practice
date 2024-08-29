import { logger } from '../logger';
import { JSDOM } from 'jsdom';
import { config } from '../config';
import { Column, Game, Clue, Round } from '../model/game.model';
import { tableParseHelper } from '../util';
import pino from 'pino';

const LOG_MODULE = 'game.controller';

export async function getGameById(id: string): Promise<Game> {
  const log = logger.child({ 
    module: LOG_MODULE,
    method: 'getGameById'
  });

  try {
    // fetch HTML from j-archive specific game page
    const response: Response = await fetch(`${config.jArchiveBaseUrl}showgame.php?game_id=${id}`);
    const body: string = await response.text();
    log.info(`Game ${id} HTML Fetched by ID:`);
    log.info(body);

    // grab game title + comments
    const doc = (new JSDOM(body)).window.document;
    const gameTitle = doc.querySelector('h1')?.textContent;
    const gameComments = doc.getElementById('game_comments')?.textContent;

    // grab contestants
    let contestants: string[] = [];
    const contestantsDiv = doc.getElementById('contestants')?.innerHTML;
    if (contestantsDiv) {
      const contestantsTable = tableParseHelper(contestantsDiv);
      // TODO: make sure this has enough rows/cells so no segfault
      const contestantContent = contestantsTable[0].cells[1];
      contestantContent.childNodes.forEach((node) => {
        const contestantString = node.textContent?.trim();
        if (contestantString) {
          contestants.push(contestantString);
        }
      });
    }

    // grab jeopardy rounds
    const jeopardyRound = parseRound(doc);
    
    const doubleJeopardyRound = parseRound(doc, true);

    // parse final jeopardy
    const finalJeopardyDivDoc = newDocFromElementId(doc, 'final_jeopardy_round');
    const finalJeopardyCategory = finalJeopardyDivDoc.getElementsByClassName('category_name')[0].textContent;
    const finalJeopardyComment = finalJeopardyDivDoc.getElementsByClassName('category_comments')[0].textContent;
    const finalJeopardyClue = finalJeopardyDivDoc.getElementById('clue_FJ')?.textContent; // TODO: html vs text content
    const finalJeopardyResponse = newDocFromElementId(finalJeopardyDivDoc  , 'clue_FJ_r').querySelector('em')?.textContent;

    return {
      title: gameTitle || '',
      note: gameComments || '',
      contestants: contestants,
      jeopardyRound: jeopardyRound,
      doubleJeopardyRound: doubleJeopardyRound,
      finalJeopardyRound: {
        category: finalJeopardyCategory || '',
        categoryComment: finalJeopardyComment || '',
        clue: finalJeopardyClue || '',
        correctResponse: finalJeopardyResponse || ''
      }
    };
  } catch (error: any) {
    log.error(error);
    throw error;
  }
}

function parseRound(doc: Document, isDJ: boolean = false): Round {
  const log = logger.child({ 
    module: LOG_MODULE,
    method: 'parseRound'
  });

  const roundElementId = isDJ ? 'double_jeopardy_round' : 'jeopardy_round';
  const cluePrefix = isDJ ? 'DJ' : 'J';
  const valueMultiplier = isDJ ? 400 : 200;

  const roundDiv = doc.getElementById(roundElementId);
  if (!roundDiv) {
    throw new Error(`Could not find jeopardy round`);
  }
  const roundTable = roundDiv.querySelector('table');
  if (!roundTable) {
    throw new Error(`Could not find jeopardy round table`);
  }

  // categories
  const roundCategories = roundTable.getElementsByClassName('category_name');
  const roundCategoryComments = roundTable.getElementsByClassName('category_comments');
  // TODO: error check

  let categoryList = [];
  for (let i = 0; i < roundCategories.length; i++) {
    const category = roundCategories[i].textContent;
    const categoryComments = roundCategoryComments [i].textContent;
    categoryList.push({
      category,
      comment: categoryComments || ''
    });
  }

  let round: Round = {
    columns: []
  };
  for (let i = 1; i <= 6; i++) {
    let column: Column;
    let clues: Clue[] = [];
    for (let j = 1; j <= 5; j++) {
      const clueValue = j * valueMultiplier;
      const clueText = doc.getElementById(`clue_${cluePrefix}_${i}_${j}`)?.textContent; // TODO: decide if innerHTML or textContent is better
      const responseDom = newDocFromElementId(doc, `clue_${cluePrefix}_${i}_${j}_r`);
      const responseText = responseDom.querySelector('em')?.textContent;
      clues.push({
        clueId: [i, j],
        value: clueValue,
        clue: clueText || '',
        correctResponse: responseText || ''
      });
    }

    column = {
      category: categoryList[i-1].category || '',
      categoryComment: categoryList[i-1].comment || '',
      clues: clues
    }
    round.columns.push(column);
  }
  return round;
}

function newDocFromElementId(currentDoc: Document, id: string): Document {
  const element = currentDoc.getElementById(id);
  if (!element) {
    throw new Error(`Could not find element with id ${id}`);
  }
  const elementHtml = element.outerHTML;
  return (new JSDOM(elementHtml)).window.document;
}

function printRound(round: Round, log: pino.Logger<never>): void {
  round.columns.forEach((column) => {
    log.info(`Category: ${column.category}`);
    column.clues.forEach((clue) => {
      log.info(`Value: ${clue.value}`);
      log.info(`Clue: ${clue.clue}`);
      log.info(`Response: ${clue.correctResponse}`);
    });
  });
}