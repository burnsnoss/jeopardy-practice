import { JSDOM } from 'jsdom';
import { logger } from './logger';


const LOG_MODULE = 'util';

/* 
 * tableParseHelper - returns collection of rows from first table in HTML
 * Input [string] - string of HTML to parse
 * Output [HTMLCollectionOf<HTMLTableRowElement>] - collection of rows
 */
export function tableParseHelper(htmlBody: string): HTMLCollectionOf<HTMLTableRowElement> {
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