export interface IMovie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
  overview?: string;
}

export type WatchlistContextType = {
  watchlist: IMovie[];
  addMovie: (m: IMovie) => void;
  removeMovie: (id: number) => void;
};