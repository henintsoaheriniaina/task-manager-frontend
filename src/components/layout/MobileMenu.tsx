import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const MobileMenu = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <header className="lg:hidden">
        <Button variant={"ghost"} onClick={() => setOpenMobile(true)}>
          <Menu />
          Menu
        </Button>
      </header>
    </>
  );
};

export default MobileMenu;
