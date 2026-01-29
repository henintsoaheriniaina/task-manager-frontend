import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Moon, Sun } from "lucide-react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import {
  useChangePassword,
  useUpdateProfile,
} from "@/hooks/use-accessible-user";
import { useTheme } from "@/hooks/use-theme";
import {
  changePasswordSchema,
  updateUserSchema,
  type ChangePasswordInput,
  type UpdateUserInput,
} from "@/schemas/user.schema";
import useAuthStore from "@/stores/auth-store";

export default function Settings() {
  const user = useAuthStore.use.user();
  const { theme, setTheme } = useTheme();

  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: changePassword } = useChangePassword();

  const profileForm = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      profile: user?.profile || "",
    },
  });

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onUpdateProfile = (data: UpdateUserInput) => {
    updateProfile(data);
  };

  const onChangePassword = (data: ChangePasswordInput) => {
    changePassword(data, {
      onSuccess: () => passwordForm.reset(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Manage your personal information and security.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
          <p className="text-sm text-muted-foreground">
            Toggle your visual theme.
          </p>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-xl bg-card shadow-sm border-border">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <p className="font-medium">Dark Mode</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          <div className="flex items-center gap-6 p-4 border rounded-xl bg-muted/30 border-dashed border-border">
            <div className="relative group">
              <Avatar className="size-20 border-2 border-background shadow-md">
                <AvatarImage src={profileForm.watch("profile")} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white size-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-secondary text-secondary-foreground uppercase tracking-widest">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">
            Public Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            How others see you on the platform.
          </p>
        </div>
        <form
          onSubmit={profileForm.handleSubmit(onUpdateProfile)}
          className="md:col-span-2"
        >
          <FieldGroup className="p-6 border rounded-xl bg-card shadow-sm border-border">
            <Field data-invalid={!!profileForm.formState.errors.name}>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                {...profileForm.register("name")}
                disabled={profileForm.formState.isSubmitting}
              />
              <FieldError errors={[profileForm.formState.errors.name]} />
            </Field>
            <Field data-invalid={!!profileForm.formState.errors.email}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...profileForm.register("email")}
                disabled={profileForm.formState.isSubmitting}
              />
              <FieldError errors={[profileForm.formState.errors.email]} />
            </Field>

            <Field data-invalid={!!profileForm.formState.errors.profile}>
              <FieldLabel>Avatar URL</FieldLabel>
              <Input
                {...profileForm.register("profile")}
                disabled={profileForm.formState.isSubmitting}
                placeholder="https://..."
              />
              <FieldError errors={[profileForm.formState.errors.profile]} />
            </Field>

            <Button
              type="submit"
              disabled={profileForm.formState.isSubmitting}
              className="w-fit ml-auto gap-2"
            >
              {profileForm.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </FieldGroup>
        </form>
      </section>

      <Separator />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Security</h2>
          <p className="text-sm text-muted-foreground">
            Update your password regularly.
          </p>
        </div>
        <form
          onSubmit={passwordForm.handleSubmit(onChangePassword)}
          className="md:col-span-2"
        >
          <FieldGroup className="p-6 border rounded-xl bg-card shadow-sm border-border">
            <Field
              data-invalid={!!passwordForm.formState.errors.currentPassword}
            >
              <FieldLabel>Current Password</FieldLabel>
              <Input
                type="password"
                {...passwordForm.register("currentPassword")}
                disabled={passwordForm.formState.isSubmitting}
              />
              <FieldError
                errors={[passwordForm.formState.errors.currentPassword]}
              />
            </Field>

            <Field data-invalid={!!passwordForm.formState.errors.newPassword}>
              <FieldLabel>New Password</FieldLabel>
              <Input
                type="password"
                {...passwordForm.register("newPassword")}
                disabled={passwordForm.formState.isSubmitting}
              />
              <FieldError
                errors={[passwordForm.formState.errors.newPassword]}
              />
            </Field>

            <Button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              variant="default"
              className="w-fit ml-auto gap-2"
            >
              {passwordForm.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Update Password
            </Button>
          </FieldGroup>
        </form>
      </section>
    </div>
  );
}
