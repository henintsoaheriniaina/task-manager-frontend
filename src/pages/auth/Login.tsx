import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";

const Login = () => {
  return <AuthLayout children={<LoginForm />} />;
};

export default Login;
