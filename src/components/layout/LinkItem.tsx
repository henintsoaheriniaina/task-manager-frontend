import type { MenuItem } from "@/lib/links";
import useAuthStore from "@/stores/auth-store";
import { Link, useLocation } from "react-router";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

type LinkItemProps = {
  link: MenuItem;
};
const LinkItem = ({ link }: LinkItemProps) => {
  const user = useAuthStore.use.user();
  const { pathname } = useLocation();

  if (link.isProtected && user?.role !== "admin") return null;

  const isActive = link.url == pathname;
  return (
    <SidebarMenuItem>
      <Link to={link.url}>
        <SidebarMenuButton isActive={isActive}>
          <link.icon />
          <span>{link.title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};
export default LinkItem;
