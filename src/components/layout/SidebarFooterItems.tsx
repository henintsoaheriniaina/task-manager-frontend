import api from "@/axios/api";
import useAuthStore from "@/stores/auth-store";
import { ChevronUp, LogOut, Settings2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
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

  const navigate = useNavigate();
  const logout = useAuthStore.use.logout();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await api.post("/auth/logout");
      logout();
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      logout();
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SidebarMenuItem className="flex items-center  gap-2">
        <Avatar size="lg">
          <AvatarImage src={user?.profile} alt="User profile" />
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
            <Link to={"/settigns"}>
              <DropdownMenuItem>
                <Settings2 />
                Settigns
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoading}
              variant={"destructive"}
            >
              <LogOut className="text-destructive " />
              {isLoading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </>
  );
};
export default SidebarFooterItems;
