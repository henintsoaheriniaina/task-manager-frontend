import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import links from "@/lib/links";
import { TypographyH3 } from "../ui/typography";
import LinksGroup from "./LinksGroup";
import SidebarFooterItems from "./SidebarFooterItems";

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
      <SidebarFooter className="pb-4">
        <SidebarFooterItems />
      </SidebarFooter>
    </Sidebar>
  );
}
