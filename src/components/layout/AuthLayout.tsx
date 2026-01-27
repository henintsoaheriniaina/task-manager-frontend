import useAuthStore from "@/stores/auth-store";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { TypographyH2 } from "../ui/typography";
interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}
const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  const isAuth = useAuthStore.use.isAuthenticated();
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex items-center justify-center  min-h-screen">
      <div className="hidden lg:flex h-screen flex-1/2 bg-primary"></div>
      <div className="flex-1 lg:flex-1/2  flex items-center justify-center ">
        <div className="w-full max-w-sm">
          <CardHeader className="mb-4">
            <CardTitle>
              <TypographyH2>{title}</TypographyH2>
            </CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
