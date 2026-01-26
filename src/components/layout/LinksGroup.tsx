import type { MenuItem } from "@/lib/links";
import useAuthStore from "@/stores/auth-store";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import LinkItem from "./LinkItem";

type LinksGroupProps = {
  title: string;
  links: MenuItem[];
  isProtected: boolean;
};

const LinksGroup = ({ links, title, isProtected }: LinksGroupProps) => {
  const user = useAuthStore.use.user();

  if (isProtected && user?.role !== "admin") return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link) => (
            <LinkItem key={link.title} link={link} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default LinksGroup;
