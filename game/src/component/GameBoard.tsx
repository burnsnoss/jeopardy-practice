import { useState, useCallback, useEffect } from 'react';
import { RoundProps } from '../model/Game.model';
import { CluePanel } from './CluePanel';
import '../styles/GameBoard.css';

export const GameBoard = ({columns, incrementRound}: RoundProps) => {

  const totalNumberOfClues = 30;

  const [currentClueCoords, setCurrentClueCoords] = useState([] as number[]);

  function clueIdToString(coords: number[]): string {
    return `${coords[0]},${coords[1]}`;
  }

  function generateCluesMap(): Map<string, boolean> {
    let cluesAnsweredMap = new Map<string, boolean>();
    for (const col of columns) {
      for (const clue of col.clues) {
        cluesAnsweredMap.set(clueIdToString(clue.clueId), clue.clue === '' ? true : false);
      }
    }
    return cluesAnsweredMap;
  }

  const [cluesAnswered, setClueAnswered] = useState(new Map<string, boolean>());

  // const handleIncrementRound = useCallback(() => {
  //   incrementRound();
  // }, [incrementRound]);

  // const setClueAnsweredHandler = useCallback((coords: number[]) => {
  //   setClueAnswered((new Map(cluesAnswered)).set(coords, true));
  // }, []);
  

  function setClueAnsweredHandler(coords: number[]) {
    setClueAnswered(new Map(cluesAnswered).set(clueIdToString(coords), true));
  }


  useEffect(() => {
    if (cluesAnswered.size === 0) {
      setClueAnswered(generateCluesMap());
    }
  }, [columns]);

  

  
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
            <div className="panel" onClick={() => setCurrentClueCoords(clue.clueId)}>
              <div className="clue-value-text">{clue.clue === '' || cluesAnswered.get(clueIdToString(clue.clueId)) ? '' : `${clue.value}`}</div>
            </div>
        </div>
      );
    });

    return categoryColumn;
  });

  function getCluePanel(coords: number[]): JSX.Element {
    const clue = columns[coords[0] - 1].clues[coords[1] - 1];
    return (
      <CluePanel
        category={columns[coords[0] - 1].category}
        clueId={clue.clueId}
        value={clue.value}
        clue={clue.clue}
        correctResponse={clue.correctResponse}
        setClueAnswered={() => setClueAnsweredHandler([coords[0], coords[1]])}
        backToBoardHandler={() => setCurrentClueCoords([])}
      />
    );
  }

  function getClueSelectBoard(): JSX.Element {
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
    if (ca[1]) {
      cluesAnsweredTotal++;
    }
  }

  if (cluesAnsweredTotal >= totalNumberOfClues) {
    console.log('Round complete!');
    incrementRound();
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