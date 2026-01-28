import api from "@/axios/api";
import { registerSchema, type RegisterInput } from "@/schemas/auth-schemas";
import useAuthStore from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Import useNavigate
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { TypographyP } from "../ui/typography";

const RegisterForm = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore.use.setUser();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profile: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await api.post("/auth/register", data);

      const user = response.data.user;
      toast.success(`Account created successfully! ${user.role}`);
      setUser(user);

      if (user.role == "admin") {
        navigate("/admin");
      }
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Registration failed";
      toast.error(errorMessage);

      setError("name", { message: errorMessage });
      setError("password", { message: errorMessage });
      setError("password", { message: errorMessage });
      console.error("Register error:", errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="profile"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile">Profile</FieldLabel>
              <Input
                {...field}
                id="profile"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>

        <TypographyP className="text-center">
          Already have an account?
          <Link to={"/login"} className="underline">
            Sign In
          </Link>
        </TypographyP>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
