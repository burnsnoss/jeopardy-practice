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

export interface Season {
  episodes: EpisodeMetadata[];
  name: string;
}

export interface EpisodeMetadata {
  number: number;
  airDate: Date;
  contestants: string;
}