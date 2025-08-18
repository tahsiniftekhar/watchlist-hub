import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth-utils";

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
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-surface rounded-2xl shadow-2xl p-8 w-full max-w-sm space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        {error && <p className="text-primary">{error}</p>}
        <input
          className="w-full px-4 py-2 rounded bg-bg border border-muted focus:outline-none focus:border-primary"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 rounded bg-bg border border-muted focus:outline-none focus:border-primary"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-primary py-2 rounded font-semibold hover:bg-opacity-90 transition">
          Login
        </button>
      </form>
    </div>
  );
}
