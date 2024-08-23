import express from 'express';
import cors from 'cors';
import { config } from './config';
import { logger } from './logger';
import { Forbidden } from 'http-errors';
import { getSeasons, getSeasonById } from './controller/season.controller';
import { getGameById } from './controller/game.controller';


const app = express();
app.use(cors());

app.get('/', (_, res) => {
  logger.info('GET /');
  logger.info('Sending 403 Forbidden');
  res.status(403).send('Forbidden');
  throw new Forbidden();
});

app.get('/seasons', async (req, res) => {
  logger.info('GET /seasons requested');
  logger.info(req);
  res.status(200).send(await getSeasons());
  logger.info('GET /seasons responding 200');
});

app.get('/seasons/:seasonId', async (req, res) => {
  logger.info('GET /seasons/:seasonId requested');
  logger.info(req);
  res.status(200).send(await getSeasonById(req.params.seasonId));
  logger.info('GET /seasons/:seasonId responding 200');
});

app.get('/game/:gameId', async (req, res) => {
  logger.info('GET /game/:gameId requested');
  logger.info(req);
  res.status(200).send(await getGameById(req.params.gameId));
  logger.info('GET /game/:gameId responding 200');
});

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
