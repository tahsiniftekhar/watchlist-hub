import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/searchbar";
import { movieSuggestions } from "@/constants";
import { useWindowSize } from "@/hooks/use-window-size";
import { pageTransition } from "@/lib/motion-utils";
import { searchMovies } from "@/services/tmdb";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Film, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { width } = useWindowSize();

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setPage(1);
      setTotalPages(1);
      return;
    }

    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await searchMovies(query, 1);
        setMovies(data.results);
        setPage(1);
        setTotalPages(data.total_pages);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  const hasMore = page < totalPages;

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const { data } = await searchMovies(query, nextPage);
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
      setTotalPages(data.total_pages);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page, query]);

  const columnCount = useMemo(() => {
    if (width < 420) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width < 1280) return 3;
    if (width < 1440) return 4;
    if (width < 1920) return 6;
    if (width < 2560) return 8;
    if (width < 3840) return 10;
    return 12;
  }, [width]);

  const gap = 16;
  const containerPadding = useMemo(() => {
    if (width < 640) return 32;
    if (width < 768) return 48;
    return 64;
  }, [width]);
  const maxContentWidth = Math.max(
    320,
    Math.min(width - containerPadding, 1800)
  );

  const itemWidth = Math.floor(
    (maxContentWidth - gap * (columnCount - 1)) / columnCount
  );
  const gridStyle = {
    width: Math.min(
      maxContentWidth,
      itemWidth * columnCount + gap * (columnCount - 1)
    ),
    margin: "0 auto",
  } as const;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 1000px 0px",
        threshold: 0,
      }
    );
    observer.observe(node);

    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 1000) {
      loadMore();
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    if (!hasMore) return;
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 800;
      if (nearBottom) {
        loadMore();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loadMore]);
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <SearchBar value={query} onSearch={setQuery} />

      {loading && page === 1 && (
        <div className="flex justify-center items-center h-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {!loading && !query && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mx-auto max-w-xl bg-gradient-to-b from-surface/60 to-surface/30 backdrop-blur p-8 text-center ring-1 ring-border/40 shadow-md shadow-gray-950"
        >
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/5">
            <Film size={22} className="text-primary/70" />
          </div>
          <h2 className="text-base font-medium text-text/90">
            Find your next movie
          </h2>
          <p className="mt-1 text-sm text-muted">
            Search by title, genre, or year to start exploring.
          </p>
          <div className="mt-5 space-y-3">
            <span className="block text-xs uppercase tracking-wide text-muted/80">
              Examples
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {movieSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-full border border-border/50 bg-surface/70 text-text/80 hover:bg-surface/80 hover:text-text transition text-sm active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {movies.length > 0 && (
        <div
          style={{
            ...gridStyle,
            display: "grid",
            gap: `${gap}px`,
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}

      {movies.length > 0 && (
        <div
          ref={sentinelRef}
          className="h-12 flex items-center justify-center"
        >
          {loading && page > 1 && (
            <Loader2 className="animate-spin text-primary" size={24} />
          )}
        </div>
      )}

      {!loading && query && movies.length === 0 && (
        <p className="text-center text-muted text-lg">
          No movies found for "{query}".
        </p>
      )}
    </motion.div>
  );
}
