import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import MobileMenu from "./MobileMenu";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="border p-2 w-full">
        <MobileMenu />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
