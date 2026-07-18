export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  adult?: boolean;
  video?: boolean;
}

export interface TmdbMovieDetails extends TmdbMovie {
  tagline: string | null;
  runtime: number | null;
  budget: number;
  revenue: number;
  genres: TmdbGenre[];
  production_companies: TmdbProductionCompany[];
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TmdbPerson {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path: string | null;
  known_for_department?: string;
}

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TmdbPagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TmdbCredits {
  cast: TmdbPerson[];
  crew: TmdbPerson[];
}

export interface TmdbVideosResponse {
  results: TmdbVideo[];
}
