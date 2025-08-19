import type { WatchlistContextType } from "@/types/movie.types";
import { createContext, useContext } from "react";

export const WatchlistContext = createContext<WatchlistContextType>(null!);

export const useWatchlist = () => useContext(WatchlistContext);
