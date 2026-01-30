import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import MobileMenu from "./MobileMenu";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col">
        <MobileMenu />
        <div className="p-4 md:p-8 mt-12 md:mt-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
