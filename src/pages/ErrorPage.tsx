import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const ErrorPage = ({ code = "404", title = "Page Not Found" }) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-9xl font-bold text-primary">{code}</h1>
      <p className="text-xl text-muted-foreground">{title}</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};
