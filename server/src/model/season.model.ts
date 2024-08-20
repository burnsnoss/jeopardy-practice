export interface SeasonsList {
  seasons: SeasonMetadata[];
}

export interface SeasonMetadata {
  seasonId: string;
  seasonName: string;
  startDate: Date;
  endDate: Date;
  episodeCount: number;
}

export interface Season {
  episodes: EpisodeMetadata[];
  name: string;
}

export interface EpisodeMetadata {
  id: string;
  number: string;
  airDate: Date;
  contestants: string;
  note: string;
}