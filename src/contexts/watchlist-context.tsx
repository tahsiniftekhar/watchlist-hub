import { useAuth } from "@/lib/auth-utils";
import { WatchlistContext } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";
import { useEffect, useState } from "react";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [watchlist, setWatchlist] = useState<IMovie[]>(() => {
    if (!user?.id) return [];
    const key = `watchlist_${user.id}`;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (err) {
      console.error("Failed to parse watchlist:", err);
      return [];
    }
  });

  useEffect(() => {
    if (!user?.id) {
      setWatchlist([]);
      return;
    }

    const key = `watchlist_${user.id}`;
    try {
      const item = localStorage.getItem(key);
      setWatchlist(item ? JSON.parse(item) : []);
    } catch (err) {
      console.error("Failed to parse watchlist:", err);
      setWatchlist([]);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    const key = `watchlist_${user.id}`;
    try {
      localStorage.setItem(key, JSON.stringify(watchlist));
    } catch (err) {
      console.error("Failed to save watchlist:", err);
    }
  }, [user?.id, watchlist]);

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
