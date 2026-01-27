import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { ModeToggle } from "./ModeToggle";

const MobileMenu = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <header className=" border fixed top-0 left-0 right-0  md:hidden bg-background p-2 flex items-center justify-between">
      <Button variant={"ghost"} onClick={() => setOpenMobile(true)}>
        <Menu />
        Menu
      </Button>
      <ModeToggle />
    </header>
  );
};

export default MobileMenu;
