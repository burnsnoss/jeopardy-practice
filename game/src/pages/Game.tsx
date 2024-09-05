import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GameModel } from '../model/Game.model';
import { config } from '../config';
import { GameBoard } from '../component/GameBoard';
import { FinalJeopardyRound } from '../component/FinalJeopardyRound';
import '../styles/Game.css';


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
  } as GameModel);

  const [roundType, setRoundType] = useState(0);
  const incrementRound = () => {setRoundType(roundType + 1)};

  useEffect(() => {
    async function getGame() { 
      try {
        const data = (await axios.get(`${config.serverUrl}/game/${gameId}`)).data;
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

  if (roundType === 0) {
    return (
      <div>
        <GameBoard key={"jeopardy"} columns={gameData.jeopardyRound.columns} incrementRound={incrementRound} />
      </div>
    );
  } else if (roundType === 1) {
    return (
      <div>
        <GameBoard key={"doubleJeopardy"} columns={gameData.doubleJeopardyRound.columns} incrementRound={incrementRound} />
      </div>
    );
  } else {
    return (
      <div>
        <FinalJeopardyRound roundData={gameData.finalJeopardyRound} />
      </div>
    );
  }
}