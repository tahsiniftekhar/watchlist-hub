import { useLocalStorage } from "@/hooks/use-local-storage";
import { useAuth } from "@/lib/auth-utils";
import { WatchlistContext } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useLocalStorage<IMovie[]>(
    user?.id ? `watchlist_${user.id}` : "guest_watchlist",
    []
  );

  const addMovie = (m: IMovie) =>
    setWatchlist((prev: IMovie[]) => [
      ...prev.filter((x: IMovie) => x.id !== m.id),
      m,
    ]);
  const removeMovie = (id: number) =>
    setWatchlist((prev: IMovie[]) => prev.filter((m: IMovie) => m.id !== id));

  return (
    <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie }}>
      {children}
    </WatchlistContext.Provider>
  );
}
