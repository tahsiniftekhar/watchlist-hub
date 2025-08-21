import { useAuth } from "@/lib/auth-utils";
import { useWatchlist } from "@/lib/watchlist-utils";
import { api } from "@/services/tmdb";
import type { IMovie } from "@/types/movie.types";
import { ChevronLeft, Loader2, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addMovie, removeMovie, watchlist } = useWatchlist();
  const { user } = useAuth(); // Get user from auth context
  const isInList = watchlist.some((m) => m.id === movie?.id);

  const handleWatchlistClick = () => {
    if (!movie) return;
    if (isInList) {
      removeMovie(movie.id);
      toast.success("Movie removed from watchlist!");
    } else {
      addMovie(movie);
      toast.success("Movie added to watchlist!");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/movie/${id}`)
      .then(({ data }) => setMovie(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load movie details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger mt-20">{error}</p>;
  }

  if (!movie) {
    return <p className="text-center text-muted mt-20">Movie not found.</p>;
  }

  const rating = movie.vote_average ?? 0;
  const placeholder = "/fallback-img.svg";
  const backdropSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : placeholder;
  const backdropSrcSet = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w, https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w`
    : undefined;
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : placeholder;
  const posterSrcSet = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path} 185w, https://image.tmdb.org/t/p/w300${movie.poster_path} 300w`
    : undefined;
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = placeholder;
    img.srcset = "";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-surface/60 text-text hover:bg-surface/80 transition active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <img
          src={backdropSrc}
          alt=""
          className="w-full h-64 md:h-96 object-cover rounded-xl"
          loading="lazy"
          srcSet={backdropSrcSet}
          sizes="(max-width: 768px) 780px, 1280px"
          onError={handleImgError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent rounded-xl" />
      </div>
      <div className="-mt-20 relative z-10 flex gap-6">
        <img
          src={posterSrc}
          alt={movie.title}
          className="w-40 rounded shadow-2xl"
          loading="lazy"
          srcSet={posterSrcSet}
          sizes="160px"
          onError={handleImgError}
        />
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold">{movie.title}</h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-2">
            {movie.release_date?.slice(0, 4)}
            {movie.genres && movie.genres.length > 0 && " • "}
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          {rating > 0 && (
            <p className="flex items-center gap-1 text-text text-base sm:text-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.292-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
                  clipRule="evenodd"
                />
              </svg>
              {rating.toFixed(1)} / 10
            </p>
          )}
          {user && (
            <button
              onClick={handleWatchlistClick}
              className={`mt-4 flex items-center gap-2 px-4 py-2 rounded ${
                isInList
                  ? "bg-danger hover:bg-danger-dark"
                  : "bg-primary hover:bg-primary-dark"
              } text-text text-[0.69rem] sm:text-sm transition active:scale-95`}
            >
              {isInList ? <Star size={20} /> : <Plus size={20} />}
              {isInList ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          )}
        </div>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4">Plot Summary</h2>
      <p className="text-muted-foreground leading-relaxed text-base">
        {movie.overview}
      </p>
    </div>
  );
}
