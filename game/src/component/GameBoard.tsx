import { useState, useCallback } from 'react';
import { Round } from '../model/Game.model';
import { CluePanel } from './CluePanel';
import '../styles/GameBoard.css';

export const GameBoard = ({columns}: Round) => {

  const [clueCoords, setClueCoords] = useState([] as number[]);
  const setClueCoordsHandler = (clueId: number[]) => {setClueCoords(clueId)};

  // TODO: big map of clueIds and booleans for answered/unanswered?
  
  // map categories to panels
  const categoryPanels = columns.map((column) => {
    return (
      <div className="panel-container">
        <div className="panel">
          <div className="category-text">{column.category}</div>
        </div>
      </div>
    );
  });

  // map clues to panels
  const cluePanelColumns = columns.map((column) => {

    const categoryColumn = column.clues.map((clue) => {
      return (
        <div className="panel-container">
            <div className="panel" onClick={setClueCoords(clue.clueId)}>
              <div className="clue-value-text">${clue.value}</div>
            </div>
        </div>
      );
    });

    return categoryColumn;
  });

  function getCluePanel(coords: number[]) {
    const clue = columns[coords[0] - 1].clues[coords[1] - 1];
    return (
      <CluePanel
        clueId={clue.clueId}
        value={clue.value}
        clue={clue.clue}
        correctResponse={clue.correctResponse}
        backToBoardHandler={setClueCoordsHandler}
      />
    );
  }

  if (clueCoords.length > 0) {
    return (
      <div className="gameboard-container">
        {getCluePanel(clueCoords)}
      </div>
    );
  } else {
    return (
      <div className="gameboard-container">
        <div className="categories-container">
          {categoryPanels.map((panel) => panel)}
        </div>
        <div className="clues-board-container">
          {cluePanelColumns.map((column) => {
            return (
              <div className="clue-column-container">
                {column.map((panel) => panel)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}