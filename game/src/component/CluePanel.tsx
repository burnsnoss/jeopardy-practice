import { useState } from 'react';
import { ClueProps } from '../model/Game.model';
import '../styles/CluePanel.css';

export const CluePanel = ({category, clueId, value, clue, correctResponse, setClueAnswered, backToBoardHandler}: ClueProps) => {

  const [reavealState, setRevealState] = useState(0);
  const incrementRevealState = () => {setRevealState(reavealState + 1)};
  // const btbHandler = () => {backToBoardHandler([])};

  if (reavealState === 0) {
    return (
      <div className="clue-panel-container" onClick={incrementRevealState}>
        <p className="clue-panel-category">{category}</p>
        <p className="clue-panel-value">${value}</p>
        <p className="clue-text">{clue}</p>
      </div>
    );
  } else {
    return (
      <div className="clue-panel-container" onClick={() => {
        backToBoardHandler([]);
        setClueAnswered(clueId);
      }}>
        <p className="correct-response-title">Correct Response:</p>
        <p className="correct-response">{correctResponse}</p>
      </div>
    );
  }

  
}