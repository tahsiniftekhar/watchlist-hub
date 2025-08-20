import { useAuth } from "@/lib/auth-utils";
import { cardMotion, iconButtonMotion, slideUp } from "@/lib/motion-utils";
import { useWatchlist } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";
import { motion, useInView } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: IMovie }) {
  const { user } = useAuth();
  const { watchlist, addMovie, removeMovie } = useWatchlist();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

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
      ref={ref}
      variants={slideUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...cardMotion}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="block shadow-sm shadow-gray-950 overflow-hidden bg-surface hover:shadow-xl transition relative group"
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
            {...iconButtonMotion}
            aria-label={
              isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
            }
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
