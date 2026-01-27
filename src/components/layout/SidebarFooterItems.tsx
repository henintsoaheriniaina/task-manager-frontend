import useAuthStore from "@/stores/auth-store";
import { ChevronUp, Settings2 } from "lucide-react";
import { Link } from "react-router";
import LogoutButton from "../auth/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuItem } from "../ui/sidebar";
import { TypographySmall } from "../ui/typography";
import { ModeToggle } from "./ModeToggle";

const SidebarFooterItems = () => {
  const user = useAuthStore.use.user();
  return (
    <>
      <SidebarMenuItem className="flex items-center  gap-2">
        <Avatar size="lg">
          <AvatarImage src={user!.profile} alt="User profile" />
          <AvatarFallback>PT</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <TypographySmall>{user?.name}</TypographySmall>
        </div>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"}>
              <ChevronUp />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem asChild>
              <Link to={"/settigns"}>
                <Button variant={"ghost"} className="justify-start ">
                  <Settings2 className="text-primary" />
                  Settigns
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </>
  );
};
export default SidebarFooterItems;
