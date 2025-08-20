import SearchBar from "@/components/searchbar";
import { Cell } from "@/components/virtualized-cell";
import { useWindowSize } from "@/hooks/use-window-size";
import { pageTransition } from "@/lib/motion-utils";
import { searchMovies } from "@/services/tmdb";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

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
      <SearchBar onSearch={setQuery} />

      {loading && page === 1 && (
        <div className="flex justify-center items-center h-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
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
              style={{margin: '0 auto', overflow: 'hidden'}}
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
