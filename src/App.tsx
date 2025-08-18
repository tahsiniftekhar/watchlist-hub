import AuthGuard from "@/components/auth-guard";
import Layout from "@/components/layout";
import DetailsPage from "@/pages/details-page";
import LoginPage from "@/pages/login-page";
import { NotFoundPage } from "@/pages/not-found-page";
import PlaygroundPage from "@/pages/playground-page";
import SearchPage from "@/pages/search-page";
import WatchlistPage from "@/pages/watchlist-page";
import { Route, Routes } from "react-router-dom";

export default function App() {
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
