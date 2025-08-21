import { buttonMotion, pageTransition } from "@/lib/motion-utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) nav("/search", { replace: true });
    else setError("Invalid credentials");
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-screen flex items-center justify-center bg-bg"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-surface rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-8 border border-border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-extrabold text-center text-primary mb-2 tracking-tight">
          Sign in to WatchlistHub
        </h1>
        <p className="text-center text-muted-foreground mb-6 text-base">
          Enter your credentials to continue
        </p>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              className="text-danger text-center font-semibold mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text placeholder:text-muted focus:outline-none focus:border-primary transition"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text placeholder:text-muted focus:outline-none focus:border-primary transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <motion.button
          {...buttonMotion}
          className="w-full bg-primary text-text py-3 rounded-lg font-bold text-lg shadow-md hover:bg-primary-dark transition mt-2"
        >
          Login
        </motion.button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Sign Up here
          </Link>
        </p>
      </motion.form>
    </motion.div>
  );
}
