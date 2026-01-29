import useAuthStore from "@/stores/auth-store";
import { Navigate } from "react-router";

const Redirect = () => {
  const user = useAuthStore.use.user();
  if (user?.role == "admin") {
    return <Navigate to={"/admin"} replace />;
  }
  return <Navigate to={"/tasks"} replace />;
};
export default Redirect;
