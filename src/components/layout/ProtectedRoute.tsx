import useAuthStore from "@/stores/auth-store";
import { Navigate, Outlet } from "react-router";

interface Props {
  allowedRoles?: ("admin" | "user")[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
