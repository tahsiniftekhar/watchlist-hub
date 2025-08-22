import { useAuth } from "@/lib/auth-utils";
import { slideInRight } from "@/lib/motion-utils";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LogIn, LogOut, Menu, Search, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
    <NavLink to={to} className="relative px-2 py-1">
      {({ isActive }) => (
        <span
          className={`flex items-center gap-1 text-sm font-medium transition ${
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

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface backdrop-blur sticky top-0 z-20 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 flex justify-between items-center shadow-sm">
      <Link
        to="/search"
        className="text-xl font-bold text-primary tracking-wide"
      >
        WatchlistHub
      </Link>

      <nav className="hidden md:flex md:flex-col items-end">
        {user ? (
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            {user.email}
          </span>
        ) : (
          ""
        )}
        <div className="hidden md:flex items-center gap-1 text-sm">
        <NavItem to="/search" icon={<Search size={16} />} label="Search" />
        {user ? (
          <div className="flex items-center gap-1">
            <NavItem
              to="/watchlist"
              icon={<Heart size={16} />}
              label="Watchlist"
            />
            <button
              onClick={logout}
              className="flex items-center gap-1 text-sm text-muted hover:text-primary transition active:scale-95"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavItem to="/login" icon={<LogIn size={16} />} label="Login" />
            <NavItem
              to="/signup"
              icon={<UserPlus size={16} />}
              label="Sign Up"
            />
          </>
        )}
        </div>
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
            className="md:hidden fixed top-[60px] right-5 w-2/3 max-w-xs flex flex-col gap-4 p-4 bg-surface backdrop-blur rounded-xl shadow-lg z-10 text-sm"
          >
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex items-center justify-end gap-2 hover:text-primary transition ${
                  isActive ? "text-primary" : "text-text"
                } active:scale-95`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={16} />
              Search
            </NavLink>

            {user ? (
              <div className="flex flex-col items-end gap-3">
                <NavLink
                  to="/watchlist"
                  className={({ isActive }) =>
                    `flex items-center justify-end gap-2 hover:text-primary transition ${
                      isActive ? "text-primary" : "text-text"
                    } active:scale-95`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={16} />
                  Watchlist
                </NavLink>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground font-medium">
                    {user.email}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-sm text-muted hover:text-primary transition active:scale-95"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center justify-end gap-2 hover:text-primary transition ${
                      isActive ? "text-primary" : "text-text"
                    } active:scale-95`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={16} />
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `flex items-center justify-end gap-2 hover:text-primary transition ${
                      isActive ? "text-primary" : "text-text"
                    } active:scale-95`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus size={16} />
                  Sign Up
                </NavLink>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
