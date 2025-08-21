export const APP_NAME = "WatchlistHub";

export const ROUTE_TITLES: { [key: string]: string } = {
  "/": "Search Movies",
  "/search": "Search Movies",
  "/watchlist": "My Watchlist",
  "/login": "Login",
  "/playground": "Playground",
  "/movie/:id": "Movie Details",
};

export const tempUsers = [
  { id: "1", email: "anthony@russo.com", password: "123456" },
  { id: "2", email: "test@example.com", password: "password" },
  { id: "3", email: "john.doe@email.com", password: "securepass" },
  { id: "4", email: "jane.smith@mail.com", password: "mysecret" },
];

export const movieSuggestions = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
];
