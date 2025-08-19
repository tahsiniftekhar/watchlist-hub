import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/searchbar";
import { pageTransition, slideUp, staggerContainer } from "@/lib/motion-utils";
import { searchMovies } from "@/services/tmdb";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return setMovies([]);
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await searchMovies(query);
        setMovies(data.results);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <SearchBar onSearch={setQuery} />
      {loading && (
        <div className="flex justify-center items-center h-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {movies.map((m) => (
          <motion.div key={m.id} variants={slideUp}>
            <MovieCard movie={m} />
          </motion.div>
        ))}
      </motion.div>

      {!loading && query && movies.length === 0 && (
        <p className="text-center text-muted text-lg">
          No movies found for "{query}".
        </p>
      )}
    </motion.div>
  );
}
