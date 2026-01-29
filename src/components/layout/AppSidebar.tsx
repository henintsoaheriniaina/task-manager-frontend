import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import sidebarGroups from "@/lib/links";
import { TypographyH3 } from "../ui/typography";
import LinksGroup from "./LinksGroup";
import SidebarFooterItems from "./SidebarFooterItems";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pt-6">
        <TypographyH3>Tasks</TypographyH3>
      </SidebarHeader>
      <SidebarContent>
        {sidebarGroups.map((group) => (
          <LinksGroup
            title={group.groupTitle}
            links={group.links}
            key={group.groupTitle}
            isProtected={group.isProtected}
          />
        ))}
      </SidebarContent>
      <SidebarFooter className="pb-6">
        <SidebarFooterItems />
      </SidebarFooter>
    </Sidebar>
  );
}
