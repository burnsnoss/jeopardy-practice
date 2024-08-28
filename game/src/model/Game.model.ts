export interface GameDOM {
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

export interface Column {
  category: string;
  categoryComment: string;
  clues: Clue[];
}

export interface Clue {
  value: number;
  clue: string;
  correctResponse: string;
}

interface FinalRound {
  category: string;
  categoryComment: string;
  clue: string;
  correctResponse: string;
}