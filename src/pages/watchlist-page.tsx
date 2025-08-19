import MovieCard from "@/components/movie-card";
import { useWatchlist } from "@/lib/watchlist-utils";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  if (watchlist.length === 0)
    return (
      <p className="text-center text-muted mt-20">Your watchlist is empty.</p>
    );
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {watchlist.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
