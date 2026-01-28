import sidebarGroups from "@/lib/links";
import { Outlet, useLocation } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import { TypographyH2 } from "../ui/typography";
import { AppSidebar } from "./AppSidebar";
import MobileMenu from "./MobileMenu";

const Layout = () => {
  const { pathname } = useLocation();
  let title = "Default Title";

  for (const group of sidebarGroups) {
    const foundLink = group.links.find((link) => link.url === pathname);
    if (foundLink) {
      title = foundLink.title;
      break;
    }
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full ">
        <MobileMenu />
        <div className="mt-12 pt-6 md:mt-0 px-4 border border-red-600 flex flex-col">
          <TypographyH2> {title} </TypographyH2>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
