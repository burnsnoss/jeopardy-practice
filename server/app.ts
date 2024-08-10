import express from 'express';
import { logger } from './logger';
import { Forbidden } from 'http-errors';
import { getSeasonsHandler } from './controller/season.controller';

const app = express();
const port = 5000;


app.get('/', (req, res) => {
  logger.info('GET /');
  logger.info('Sending 403 Forbidden');
  res.status(403).send('Forbidden');
  throw new Forbidden();
});

app.get('/seasons', async (req, res) => {
  logger.info('GET /seasons requested');
  logger.info(req);
  res.status(200).send(await getSeasonsHandler(req));
  logger.info('GET /seasons responding 200');
  logger.info(res);
});

app.get('/seasons/:seasonUrl', (req, res) => {

});

app.get('/game/:gameUrl', (req, res) => {

});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
