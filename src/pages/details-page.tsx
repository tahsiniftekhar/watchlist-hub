import { useWatchlist } from "@/lib/watchlist-utils";
import { api } from "@/services/tmdb";
import type { IMovie } from "@/types/movie.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { addMovie, removeMovie, watchlist } = useWatchlist();
  const isInList = watchlist.some((m) => m.id === movie?.id);

  useEffect(() => {
    api.get(`/movie/${id}`).then(({ data }) => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading…</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt=""
          className="w-full h-64 md:h-96 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent rounded-xl" />
      </div>
      <div className="-mt-20 relative z-10 flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-40 rounded shadow-2xl"
        />
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-muted">{movie.release_date}</p>
          <p className="mt-2">{movie.genres?.map((g) => g.name).join(", ")}</p>
          <button
            className="mt-4 px-4 py-2 bg-primary rounded"
            onClick={() => (isInList ? removeMovie(movie.id) : addMovie(movie))}
          >
            {isInList ? "–" : "+"}
            Watchlist
          </button>
        </div>
      </div>
      <p className="mt-6">{movie.overview}</p>
    </div>
  );
}
