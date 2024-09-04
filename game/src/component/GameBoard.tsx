import { useState, useCallback } from 'react';
import { RoundProps } from '../model/Game.model';
import { CluePanel } from './CluePanel';
import '../styles/GameBoard.css';

export const GameBoard = ({columns, incrementRound}: RoundProps) => {

  const [currentClueCoords, setCurrentClueCoords] = useState([] as number[]);
  const [cluesAnswered, setClueAnswered] = useState(() => {
    let cluesAnswered = new Map<number[], boolean>();
    columns.map((column) => {
      column.clues.map((clue) => {
        cluesAnswered.set(clue.clueId, clue.clue === '' ? true : false);
      });
    });
    return cluesAnswered;
  });

  const handleIncrementRound = useCallback(() => {
    incrementRound();
  }, [incrementRound]);

  const setClueAnsweredHandler = useCallback((coords: number[]) => {
    setClueAnswered(new Map(cluesAnswered).set(coords, true));
  }, [setClueAnswered]);
  

  
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
  const cluePanelColumns = columns.map ((column) => {

    const categoryColumn = column.clues.map((clue) => {
      return (
        <div className="panel-container">
            <div className="panel" onClick={() => setCurrentClueCoords(clue.clueId) }>
              <div className="clue-value-text">{clue.clue === '' || cluesAnswered.get(clue.clueId) ? '' : `${clue.value}`}</div>
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
        setClueAnswered={() => setClueAnsweredHandler([coords[0], coords[1]])}
        backToBoardHandler={() => setCurrentClueCoords([])}
      />
    );
  }

  function getClueSelectBoard() {
    return (
      <div>
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

  // check for completion of the board and trigger incrementRound if so
  const cluesAnsweredIterator = cluesAnswered.entries();
  let cluesAnsweredTotal = 0;
  for (const ca of cluesAnsweredIterator) {
    if (ca) {
      cluesAnsweredTotal++;
    }
  }

  if (cluesAnsweredTotal >= 3) {
    console.log('Round complete!');
    handleIncrementRound();
  }



  // render clue panel if clue is active
  if (currentClueCoords.length > 0) {
    return (
      <div className="gameboard-container">
        {getCluePanel(currentClueCoords)}
      </div>
    );
  } else { // else render categories + values
    return (
      <div className="gameboard-container">
        {getClueSelectBoard()}
      </div>
    );
  }
}