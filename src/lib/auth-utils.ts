import { TEMP_LOCAL_STORAGE_USERS_KEY } from "@/constants";
import { type AuthContextType, type User } from "@/types/auth.types";
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

export function getTempUsers(): User[] {
  const users = localStorage.getItem(TEMP_LOCAL_STORAGE_USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function setTempUsers(users: User[]) {
  localStorage.setItem(TEMP_LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
}
