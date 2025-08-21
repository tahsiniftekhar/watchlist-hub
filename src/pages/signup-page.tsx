import { useAuth } from "@/lib/auth-utils";
import { buttonMotion, pageTransition } from "@/lib/motion-utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await signup(email, password);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/watchlist");
      } else {
        toast.error("Signup failed. Email might already be in use.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
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
          Sign up to WatchlistHub
        </h1>
        <p className="text-center text-muted-foreground mb-6 text-base">
          Create your account to continue
        </p>
        <AnimatePresence mode="wait">
        </AnimatePresence>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text placeholder:text-muted focus:outline-none focus:border-primary transition"
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text placeholder:text-muted focus:outline-none focus:border-primary transition"
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <motion.button
          {...buttonMotion}
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-text py-3 rounded-lg font-bold text-lg shadow-md hover:bg-primary-dark transition mt-2"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </motion.button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </motion.div>
  );
}
