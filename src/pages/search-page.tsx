import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/searchbar";
import type { IMovie } from "@/types/movie.types";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";

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
    <div className="space-y-6">
      <SearchBar onSearch={setQuery} />
      {loading && <p className="text-center">Loading…</p>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
