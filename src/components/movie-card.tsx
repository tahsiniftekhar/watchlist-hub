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

  const placeholder = "/fallback-img.svg";
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : placeholder;
  const posterSrcSet = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path} 185w, https://image.tmdb.org/t/p/w342${movie.poster_path} 342w, https://image.tmdb.org/t/p/w500${movie.poster_path} 500w`
    : undefined;
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = placeholder;
    img.srcset = "";
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
        className="block overflow-hidden bg-surface/80 ring-1 ring-border/40 hover:ring-border transition relative group rounded-sm shadow-sm shadow-gray-950"
      >
        <img
          src={posterSrc}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover will-change-transform duration-300 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          srcSet={posterSrcSet}
          sizes="(max-width: 600px) 185px, (max-width: 900px) 342px, 500px"
          onError={handleImgError}
        />
        {typeof movie.vote_average === "number" && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-black/70 backdrop-blur px-2 py-1 text-[11px] font-semibold text-white/90">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}

        {user && (
          <motion.button
            onClick={handleWatchlistClick}
            className={`absolute top-2 right-2 z-10 p-2 rounded-full text-text ${
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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="font-semibold text-white text-sm sm:text-base truncate">
            {movie.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-white/80">
            {movie.release_date?.slice(0, 4) && (
              <span>{movie.release_date.slice(0, 4)}</span>
            )}
          </div>
        </div>

        <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition" />
      </Link>
    </motion.div>
  );
}
