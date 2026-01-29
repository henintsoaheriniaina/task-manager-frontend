import api from "@/axios/api";
import useAuthStore from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import MobileMenu from "./MobileMenu";

const AccessibleLayout = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        setIsVerifying(false);
        return;
      }
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        logout();
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, []);

  if (isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full ">
        <MobileMenu />
        <div className="mt-12 py-6 md:mt-0 px-4 0 flex flex-col">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AccessibleLayout;
