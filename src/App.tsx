import AuthGuard from "@/components/auth-guard";
import Layout from "@/components/layout";
import DetailsPage from "@/pages/details-page";
import LoginPage from "@/pages/login-page";
import { NotFoundPage } from "@/pages/not-found-page";
import PlaygroundPage from "@/pages/playground-page";
import SearchPage from "@/pages/search-page";
import WatchlistPage from "@/pages/watchlist-page";
import { useEffect } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Movie Watchlist";

    const routeTitles: { [key: string]: string } = {
      "/": "Search Movies",
      "/search": "Search Movies",
      "/watchlist": "My Watchlist",
      "/login": "Login",
      "/playground": "Playground",
      "/movie/:id": "Movie Details",
    };

    for (const routePattern in routeTitles) {
      if (matchPath(routePattern, path)) {
        title = routeTitles[routePattern];
        break;
      }
    }

    if (title === "Movie Watchlist" && path !== "/") {
      title = "Page Not Found";
    }

    document.title = title;
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/playground" element={<PlaygroundPage />} />

      <Route element={<AuthGuard />}>
        <Route element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
