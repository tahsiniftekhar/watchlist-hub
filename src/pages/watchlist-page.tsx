import { iconButtonMotion, pageTransition, slideUp } from "@/lib/motion-utils";
import { useWatchlist } from "@/lib/watchlist-utils";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function WatchlistPage() {
  const { watchlist, removeMovie } = useWatchlist();

  const placeholder = "/fallback-img.svg";
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = placeholder;
    img.srcset = "";
  };

  if (watchlist.length === 0)
    return (
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="text-center mt-20 p-6 bg-surface rounded-lg shadow-md max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Your watchlist is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Start exploring movies and add your favorites!
        </p>
        <Link
          to="/search"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary-dark h-10 px-4 py-2 active:scale-95"
        >
          Discover movies
        </Link>
      </motion.div>
    );

  return (
    <motion.section
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 sm:gap-5 lg:gap-6">
        {watchlist.map((movie: IMovie, index) => {
          return (
            <motion.li
              key={movie.id}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative bg-surface rounded-xl overflow-hidden shadow-lg flex flex-col group cursor-pointer"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : placeholder
                  }
                  srcSet={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w185${movie.poster_path} 185w, https://image.tmdb.org/t/p/w342${movie.poster_path} 342w, https://image.tmdb.org/t/p/w500${movie.poster_path} 500w`
                      : undefined
                  }
                  sizes="(max-width: 640px) 185px, (max-width: 1024px) 342px, 500px"
                  alt={movie.title}
                  className="aspect-[2/3] w-full object-cover"
                  loading="lazy"
                  onError={handleImgError}
                />

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeMovie(movie.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full text-text bg-danger hover:bg-danger-dark transition opacity-0 group-hover:opacity-100"
                  {...iconButtonMotion}
                  aria-label="Remove from watchlist"
                >
                  <Trash2 size={18} />
                </motion.button>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold truncate text-base md:text-lg">
                      {movie.title}
                    </h2>
                    <p className="text-sm text-muted">
                      {movie.release_date?.slice(0, 4)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
