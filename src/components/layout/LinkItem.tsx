import type { MenuItem } from "@/lib/links";
import useAuthStore from "@/stores/auth-store";
import { Link } from "react-router";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

type LinkItemProps = {
  link: MenuItem;
};
const LinkItem = ({ link }: LinkItemProps) => {
  const user = useAuthStore.use.user();

  if (link.isProtected && user?.role !== "admin") return null;
  return (
    <SidebarMenuItem>
      <Link to={link.url}>
        <SidebarMenuButton>
          <link.icon />
          <span>{link.title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};
export default LinkItem;
