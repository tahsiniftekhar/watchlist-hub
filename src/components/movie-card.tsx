import { useAuth } from "@/lib/auth-utils";
import { useWatchlist } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: IMovie }) {
  const { user } = useAuth();
  const { watchlist, addMovie, removeMovie } = useWatchlist();

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchlist) {
      removeMovie(movie.id);
      toast.success("Removed from watchlist!");
    } else {
      addMovie(movie);
      toast.success("Added to watchlist!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="block rounded-lg overflow-hidden bg-surface transition relative group"
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
          srcSet={`https://image.tmdb.org/t/p/w185${movie.poster_path} 185w, https://image.tmdb.org/t/p/w342${movie.poster_path} 342w, https://image.tmdb.org/t/p/w500${movie.poster_path} 500w`}
          sizes="(max-width: 600px) 185px, (max-width: 900px) 342px, 500px"
        />

        {user && (
          <motion.button
            onClick={handleWatchlistClick}
            className={`absolute top-2 right-2 p-2 rounded-full text-text ${
              isInWatchlist
                ? "bg-danger hover:bg-danger-dark"
                : "bg-primary hover:bg-primary-dark"
            } transition opacity-0 group-hover:opacity-100 active:scale-95`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {isInWatchlist ? <Star size={18} /> : <Plus size={18} />}
          </motion.button>
        )}

        <div className="p-3">
          <h3 className="font-semibold truncate text-base md:text-lg">
            {movie.title}
          </h3>
          <p className="text-sm text-muted">
            {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
