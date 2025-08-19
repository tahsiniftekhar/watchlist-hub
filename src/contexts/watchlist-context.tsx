import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuth } from "@/lib/auth-utils";
import { WatchlistContext } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const key = user ? `watchlist_${user.id}` : "";
  const [watchlist, setWatchlist] = useLocalStorage<IMovie[]>(key, []);

  const addMovie = (m: IMovie) =>
    setWatchlist((prev) => [...prev.filter((x) => x.id !== m.id), m]);
  const removeMovie = (id: number) =>
    setWatchlist((prev) => prev.filter((m) => m.id !== id));

  return (
    <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie }}>
      {children}
    </WatchlistContext.Provider>
  );
}
