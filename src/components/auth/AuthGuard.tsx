// components/auth/AuthGuard.tsx
import api from "@/axios/api";
import useAuthStore from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export const AuthGuard = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { isAuthenticated, user, setUser, logout } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (err) {
        logout();
      } finally {
        setIsVerifying(false);
      }
    };
    checkAuth();
  }, []);

  if (isVerifying)
    return (
      <div className="h-screen flex items-center justify-center animate-pulse">
        Loading...
      </div>
    );

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
