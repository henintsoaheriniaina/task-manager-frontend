import api from "@/axios/api";
import { loginSchema, type LoginInput } from "@/schemas/auth-schemas";
import useAuthStore from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Ajout navigate
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { TypographyP } from "../ui/typography";

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore.use.setUser();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await api.post("/auth/login", data);

      const user = response.data.user;
      toast.success("Welcome back!");
      setUser(user);

      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      setError("email", { message: errorMessage });
      setError("password", { message: errorMessage });
      console.error("Login failed:", errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                placeholder="johndoe@example.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        <TypographyP className="text-center">
          Don't have an account ?
          <Link to={"/register"} className="underline">
            Sign Up
          </Link>
        </TypographyP>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
