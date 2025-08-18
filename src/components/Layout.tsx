import { Heart, LogOut, Search } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth-utils";

export default function Layout() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface/80 backdrop-blur sticky top-0 z-20 px-4 py-3 flex justify-between items-center">
        <Link to="/search" className="text-xl font-bold text-primary">
          MovieNight
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/search" className="hover:text-primary transition">
            <Search size={20} />
          </Link>
          {user && (
            <>
              <Link to="/watchlist" className="hover:text-primary transition">
                <Heart size={20} />
              </Link>
              <button
                onClick={logout}
                className="hover:text-primary transition"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
