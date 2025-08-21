import { APP_NAME, ROUTE_TITLES } from "@/constants";
import { Loader2 } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";

const Layout = lazy(() => import("@/components/layout"));
const AuthGuard = lazy(() => import("@/components/auth-guard"));
const SearchPage = lazy(() => import("@/pages/search-page"));
const DetailsPage = lazy(() => import("@/pages/details-page"));
const LoginPage = lazy(() => import("@/pages/login-page"));
const PlaygroundPage = lazy(() => import("@/pages/playground-page"));
const WatchlistPage = lazy(() => import("@/pages/watchlist-page"));
const NotFoundPage = lazy(() =>
  import("@/pages/not-found-page").then((m) => ({ default: m.NotFoundPage }))
);

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = APP_NAME;

    for (const routePattern in ROUTE_TITLES) {
      if (matchPath(routePattern, path)) {
        title = ROUTE_TITLES[routePattern];
        break;
      }
    }

    if (title === APP_NAME && path !== "/") {
      title = "Page Not Found";
    }

    document.title = `${title} | ${APP_NAME}`;
  }, [location.pathname]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route element={<Layout />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route index element={<SearchPage />} />
          <Route
            path="/watchlist"
            element={
              <AuthGuard>
                <WatchlistPage />
              </AuthGuard>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
