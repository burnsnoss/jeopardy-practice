export interface SeasonsList {
  seasons: SeasonMetadata[];
}

export interface SeasonMetadata {
  seasonUrl: string;
  seasonName: string;
  startDate: Date;
  endDate: Date;
  episodeCount: number;
}