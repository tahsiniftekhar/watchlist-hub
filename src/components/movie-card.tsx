import type { IMovie } from "@/types/movie.types";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: IMovie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block rounded-lg overflow-hidden bg-surface hover:scale-105 transition"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-muted">{movie.release_date?.slice(0, 4)}</p>
      </div>
    </Link>
  );
}
