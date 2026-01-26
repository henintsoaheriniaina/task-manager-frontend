import { Settings2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import links from "@/lib/links";
import { Link } from "react-router";
import LogoutButton from "../auth/LogoutButton";
import { TypographyH3 } from "../ui/typography";
import LinksGroup from "./LinksGroup";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TypographyH3>Tasks</TypographyH3>
      </SidebarHeader>
      <SidebarContent>
        {links.map((l) => (
          <LinksGroup
            title={l.groupTitle}
            links={l.links}
            key={l.groupTitle}
            isProtected={l.isProtected}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <Link to={"/settigns"}>
            <SidebarMenuButton>
              <Settings2 />
              Settigns
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
