export interface SeasonsListDOM {
  seasons: SeasonMetadata[];
}

export interface SeasonMetadata {
  seasonId: string;
  seasonName: string;
  startDate: Date;
  endDate: Date;
  episodeCount: number;
}

export interface SeasonDOM {
  episodes: EpisodeMetadata[];
  name: string;
}

export interface EpisodesListDOM {
  episodes: EpisodeMetadata[];
}

export interface EpisodeMetadata {
  id: string;
  number: string;
  airDate: Date;
  contestants: string;
  note: string;
}