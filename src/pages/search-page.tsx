import SearchBar from "@/components/searchbar";
import { Cell } from "@/components/virtualized-cell";
import { useWindowSize } from "@/hooks/use-window-size";
import { pageTransition } from "@/lib/motion-utils";
import { searchMovies } from "@/services/tmdb";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Film, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { movieSuggestions } from "@/constants";

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

  const loadMore = async () => {
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
  };

  const columnCount = useMemo(() => {
    if (width < 420) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width < 1280) return 4;
    if (width < 1440) return 5;
    return 6;
  }, [width]);

  const rowCount = hasMore
    ? Math.ceil(movies.length / columnCount) + 1
    : Math.ceil(movies.length / columnCount);

  const isItemLoaded = (rowIndex: number) => {
    const index = rowIndex * columnCount;
    return index < movies.length;
  };

  const itemWidth = 180;
  const itemHeight = 370;
  const gap = 16;

  const columnWidth = itemWidth + gap;
  const rowHeight = itemHeight + gap;

  const gridWidth = Math.min(width - 40, columnCount * columnWidth);

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
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={rowCount}
          loadMoreItems={loadMore}
        >
          {({ onItemsRendered, ref }) => (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              rowCount={rowCount}
              rowHeight={rowHeight}
              height={800}
              width={gridWidth}
              style={{ margin: "0 auto", overflow: "hidden" }}
              onItemsRendered={({
                visibleRowStartIndex,
                visibleRowStopIndex,
                overscanRowStartIndex,
                overscanRowStopIndex,
              }) => {
                onItemsRendered({
                  overscanStartIndex: overscanRowStartIndex,
                  overscanStopIndex: overscanRowStopIndex,
                  visibleStartIndex: visibleRowStartIndex,
                  visibleStopIndex: visibleRowStopIndex,
                });
              }}
              ref={ref}
            >
              {(props) => (
                <Cell
                  {...props}
                  movies={movies}
                  columnCount={columnCount}
                  loading={loading}
                />
              )}
            </Grid>
          )}
        </InfiniteLoader>
      )}

      {!loading && query && movies.length === 0 && (
        <p className="text-center text-muted text-lg">
          No movies found for "{query}".
        </p>
      )}
    </motion.div>
  );
}
