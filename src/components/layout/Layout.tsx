import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import MobileMenu from "./MobileMenu";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full ">
        <MobileMenu />
        <div className="mt-10 md:mt-0 p-6 ">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
