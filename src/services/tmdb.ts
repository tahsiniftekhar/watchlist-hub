import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: import.meta.env.VITE_TMDB_KEY },
});
export const searchMovies = (query: string, page = 1) =>
  api.get("/search/movie", { params: { query, page } });
