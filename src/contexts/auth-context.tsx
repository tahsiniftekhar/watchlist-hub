import { useState } from "react";
import { AuthContext } from "../lib/auth-utils";
import { tempUsers } from "../lib/temp-users";
import { type User } from "../types/auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string) => {
    const found = tempUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const userData = { id: found.id, email: found.email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
