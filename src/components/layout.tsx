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

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink to={to} className="relative px-1 py-0.5">
      {({ isActive }) => (
        <span
          className={`flex items-center gap-1 transition ${
            isActive ? "text-primary" : "text-muted hover:text-primary"
          }`}
        >
          {icon}
          {label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary rounded"
            />
          )}
        </span>
      )}
    </NavLink>
  );
}

export default function Layout() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface backdrop-blur sticky top-0 z-20 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 flex justify-between items-center">
        <Link to="/search" className="text-xl font-bold text-primary">
          WatchlistHub
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          <NavItem to="/search" icon={<Search size={20} />} label="Search" />
          {user ? (
            <>
              <NavItem
                to="/watchlist"
                icon={<Heart size={20} />}
                label="Watchlist"
              />
              <button
                onClick={logout}
                className="flex items-center gap-1 hover:text-primary transition text-muted active:scale-95"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <NavItem to="/login" icon={<LogIn size={20} />} label="Login" />
          )}
        </nav>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            className="active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden fixed top-[60px] right-5 h-auto w-1/3 flex flex-col gap-4 p-4 bg-surface backdrop-blur z-10 text-xs"
            >
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `flex items-center justify-end self-end gap-1 hover:text-primary transition ${
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
                      `flex items-center justify-end self-end gap-1 hover:text-primary transition ${
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
                    className="flex items-center justify-end self-end gap-1 hover:text-primary transition text-text active:scale-95"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center justify-end self-end gap-1 hover:text-primary transition ${
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
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-full mx-auto w-full">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
