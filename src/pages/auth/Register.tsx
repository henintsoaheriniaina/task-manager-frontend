import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

const Register = () => {
  return <AuthLayout children={<RegisterForm />} />;
};

export default Register;
