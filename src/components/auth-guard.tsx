import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth-utils";

export default function AuthGuard({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = useAuth();
  return user ? children ?? <Outlet /> : <Navigate to="/login" replace />;
}
