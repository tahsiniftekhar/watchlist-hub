import MovieCard from "@/components/movie-card";
import type { IMovie } from "@/types/movie.types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { GridChildComponentProps } from "react-window";

type CellProps = GridChildComponentProps & {
  movies: IMovie[];
  columnCount: number;
  loading: boolean;
};

export function Cell({
  columnIndex,
  rowIndex,
  style,
  movies,
  columnCount,
  loading,
}: CellProps) {
  const index = rowIndex * columnCount + columnIndex;

  if (index >= movies.length) {
    // loading placeholder cell
    return (
      <div style={style} className="flex items-center justify-center">
        {loading && <Loader2 className="animate-spin text-primary" />}
      </div>
    );
  }

  const movie = movies[index];

  return (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 8
      }}
    >
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <MovieCard movie={movie} />
      </motion.div>
    </div>
  );
}
