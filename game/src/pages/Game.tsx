import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GameDOM } from '../model/Game.model';
import { config } from '../config';


export const Game = () => {
  const { gameId } = useParams();

  const [gameData, setGameData] = useState({
    title: '',
    note: '',
    contestants: [],
    jeopardyRound: {
      columns: []
    },
    doubleJeopardyRound: {
      columns: []
    },
    finalJeopardyRound: {
      category: '',
      categoryComment: '',
      clue: '',
      correctResponse: ''
    }
  } as GameDOM);

  // fetch the game
  useEffect(() => {
    async function getGame() { 
      try {
        const data = (await axios.get(`${config.serverUrl}/seasons/${gameId}`)).data;
        setGameData({
          title: data.title,
          note: data.note,
          contestants: data.contestants,
          jeopardyRound: {
            columns: data.jeopardyRound.columns
          },
          doubleJeopardyRound: {
            columns: data.doubleJeopardyRound.columns
          },
          finalJeopardyRound: {
            category: data.finalJeopardyRound.category,
            categoryComment: data.finalJeopardyRound.categoryComment,
            clue: data.finalJeopardyRound.clue,
            correctResponse: data.finalJeopardyRound.correctResponse
          }
        });
      }
      catch (error) {
        throw new Error('Failed to retrieve seasons: ' + error);
      }
    }

    if (gameData.jeopardyRound.columns.length === 0) {
      getGame();
    }
  }, []);

  // pass to some component
  return (
    <div>
      <JeopardyRound columns={gameData.jeopardyRound.columns} />
      <DoubleJeopardyRound columns={gameData.jeopardyRound.columns} style={{display: 'none'}}/>
      <FinalJeopardyRound finalJeopardyRound={gameData.finalJeopardyRound} style={{display: 'none'}}/>
    </div>
  );
}