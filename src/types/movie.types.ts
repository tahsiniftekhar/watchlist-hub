export interface IMovie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
  overview?: string;
  vote_average?: number;
}

export type WatchlistContextType = {
  watchlist: IMovie[];
  addMovie: (movie: IMovie) => void;
  removeMovie: (id: number) => void;
};
