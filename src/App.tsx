import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DetailsPage from "./pages/DetailsPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Route>
    </Routes>
  );
}
