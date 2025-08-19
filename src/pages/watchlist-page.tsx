import { Trash2 } from "lucide-react";
import { useWatchlist } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";
import { Link } from "react-router-dom";

export default function WatchlistPage() {
  const { watchlist, removeMovie } = useWatchlist();

  if (watchlist.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
        <Link to="/search" className="text-primary underline">
          Discover movies
        </Link>
      </div>
    );

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {watchlist.map((movie: IMovie) => (
          <li
            key={movie.id}
            className="bg-surface rounded-xl overflow-hidden shadow-lg flex flex-col"
          >
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="aspect-[2/3] w-full object-cover"
            />

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold truncate">{movie.title}</h2>
                <p className="text-sm text-muted">{movie.release_date?.slice(0, 4)}</p>
              </div>

              <button
                onClick={() => removeMovie(movie.id)}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded bg-red-600/20 text-red-400 py-1.5 hover:bg-red-600/30 transition"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}