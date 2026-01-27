import api from "@/axios/api";
import useAuthStore from "@/stores/auth-store";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";

const LogoutButton = () => {
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
      // Même si l'appel API échoue (ex: token déjà expiré),
      // on force le logout local pour ne pas bloquer l'user
      logout();
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={"ghost"}
      className="justify-start w-full text-destructive hover:text-destructive hover:bg-destructive/30"
    >
      <LogOut className="text-destructive " />
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
