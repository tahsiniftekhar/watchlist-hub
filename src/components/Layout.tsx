import { useAuth } from "@/lib/auth-utils";
import { slideInRight } from "@/lib/motion-utils";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LogIn, LogOut, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-surface border-t border-border text-center py-4 text-sm text-muted">
      © {new Date().getFullYear()} WatchlistHub — All rights reserved.
    </footer>
  );
}

export default function Layout() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface backdrop-blur sticky top-0 z-20 px-4 py-3 flex justify-between items-center md:px-8">
        <Link to="/search" className="text-xl font-bold text-primary">
          WatchlistHub
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-primary transition ${
                isActive ? "text-primary" : "text-muted"
              } active:scale-95`
            }
          >
            <Search size={20} />
            Search
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  `flex items-center gap-1 hover:text-primary transition ${
                    isActive ? "text-primary" : "text-muted"
                  } active:scale-95`
                }
              >
                <Heart size={20} />
                Watchlist
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center gap-1 hover:text-primary transition text-muted active:scale-95"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:text-primary transition ${
                  isActive ? "text-primary" : "text-muted"
                } active:scale-95`
              }
            >
              <LogIn size={20} />
              Login
            </NavLink>
          )}
        </nav>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="active:scale-95"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden flex flex-col items-end gap-4 p-4 bg-surface backdrop-blur w-full z-10 text-xs"
          >
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex items-center justify-end gap-1 hover:text-primary transition ${
                  isActive ? "text-primary" : "text-text"
                } active:scale-95`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={20} />
              Search
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/watchlist"
                  className={({ isActive }) =>
                    `flex items-center justify-end gap-1 hover:text-primary transition ${
                      isActive ? "text-primary" : "text-text"
                    } active:scale-95`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={20} />
                  Watchlist
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-end gap-1 hover:text-primary transition text-text active:scale-95"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center justify-end gap-1 hover:text-primary transition ${
                    isActive ? "text-primary" : "text-text"
                  } active:scale-95`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn size={20} />
                Login
              </NavLink>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
