export interface GameModel {
  title: string;
  note: string;
  contestants: string[];
  jeopardyRound: Round;
  doubleJeopardyRound: Round;
  finalJeopardyRound: FinalRound;
}

export interface Round {
  columns: Column[];
}

export interface RoundProps {
  columns: Column[];
  incrementRound: () => void;
}

export interface Column {
  category: string;
  categoryComment: string;
  clues: Clue[];
}

export interface Clue {
  clueId: number[];
  value: number;
  clue: string;
  correctResponse: string;
}

export interface ClueProps {
  category: string;
  clueId: number[];
  value: number;
  clue: string;
  correctResponse: string;
  setClueAnswered: (clueId: number[]) => void;
  backToBoardHandler: (clueId: number[]) => void;
}

interface FinalRound {
  category: string;
  categoryComment: string;
  clue: string;
  correctResponse: string;
}

export interface FinalRoundProps {
  roundData: FinalRound;
}