import api from "@/axios/api";
import sidebarGroups from "@/lib/links";
import useAuthStore from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import { TypographyH2 } from "../ui/typography";
import { AppSidebar } from "./AppSidebar";
import MobileMenu from "./MobileMenu";

const AdminLayout = () => {
  const { pathname } = useLocation();
  let title = "Default Title";

  for (const group of sidebarGroups) {
    const foundLink = group.links.find((link) => link.url.startsWith(pathname));
    if (foundLink) {
      title = foundLink.title;
      break;
    }
  }

  const { isAuthenticated, setUser, logout, user } = useAuthStore();
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

  if (!isAuthenticated || (user && user.role != "admin")) {
    return <Navigate to="/login" replace />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full ">
        <MobileMenu />
        <div className="mt-12 py-6 md:mt-0 px-4 0 flex flex-col">
          <TypographyH2 className="mb-2 text-center lg:text-left">
            {title}
          </TypographyH2>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
