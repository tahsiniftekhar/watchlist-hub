import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth-utils";

export default function AuthGuard() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
