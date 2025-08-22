import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-utils";
import { WatchlistContext } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<IMovie[]>([]);

  useEffect(() => {
    if (user) {
      const key = `watchlist_${user.id}`;
      const item = localStorage.getItem(key);
      setWatchlist(item ? JSON.parse(item) : []);
    } else {
      setWatchlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const key = `watchlist_${user.id}`;
      localStorage.setItem(key, JSON.stringify(watchlist));
    }
  }, [user, watchlist]);

  const addMovie = (m: IMovie) =>
    setWatchlist((prev) => [
      ...prev.filter((x) => x.id !== m.id),
      m,
    ]);

  const removeMovie = (id: number) =>
    setWatchlist((prev) => prev.filter((m) => m.id !== id));

  return (
    <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie }}>
      {children}
    </WatchlistContext.Provider>
  );
}
