import { useCallback } from 'react';
import { RoundProps } from '../model/Game.model';


export const JeopardyRound = ({columns, roundSwitcher}: RoundProps) => {

  const handleRoundSwitch = useCallback(() => {
      roundSwitcher();
    }, [roundSwitcher]
  )

  return (
    <div>
      <button onClick={handleRoundSwitch}>Double Jeopardy</button>
    </div>
  );
}