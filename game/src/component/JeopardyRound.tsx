import { useCallback } from 'react';
import { RoundProps } from '../model/Game.model';
import { GameBoard } from './GameBoard';


export const JeopardyRound = ({columns, roundSwitcher}: RoundProps) => {

  const handleRoundSwitch = useCallback(() => {
      roundSwitcher();
    }, [roundSwitcher]
  )

  

  return (
    <div>
      <GameBoard columns={columns} />
    </div>
  );
}