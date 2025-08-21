import { AuthContext, getTempUsers, setTempUsers } from "@/lib/auth-utils";
import { type User } from "@/types/auth.types";
import { useState } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string) => {
    const currentUsers = getTempUsers();
    const found = currentUsers.find(
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

  const signup = async (email: string, password: string) => {
    const currentUsers = getTempUsers();
    const userExists = currentUsers.some((u) => u.email === email);

    if (userExists) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
    };
    const updatedUsers = [...currentUsers, newUser];
    setTempUsers(updatedUsers);

    setUser({ id: newUser.id, email: newUser.email });
    localStorage.setItem(
      "user",
      JSON.stringify({ id: newUser.id, email: newUser.email })
    );
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
