import { useState } from 'react';
import { ClueProps } from '../model/Game.model';

export const CluePanel = ({clueId, value, clue, correctResponse, backToBoardHandler}: ClueProps) => {

  const [reavealState, setRevealState] = useState(0);
  const incrementRevealState = () => {setRevealState(reavealState + 1)};
  const btbHandler = () => {backToBoardHandler([])};

  if (reavealState === 0) {
    return (
      <div onClick={incrementRevealState}>
        <p>{clueId}</p>
        <p>${value}</p>
        <p>{clue}</p>
      </div>
    );
  } else {
    return (
      <div onClick={btbHandler}>
        <p>{correctResponse}</p>
      </div>
    );
  }

  
}