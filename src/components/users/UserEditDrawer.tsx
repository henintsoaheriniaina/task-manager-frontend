import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useGetUser, useUpdateUser } from "@/hooks/use-users";
import { updateUserSchema, type UpdateUserInput } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type UserEditDrawerProps = {
  id: string;
};

export function UserEditDrawer({ id }: UserEditDrawerProps) {
  const [open, setOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useGetUser(id);
  const { mutate: updateUser } = useUpdateUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateUserInput) => {
    updateUser(
      { id, ...data },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("User updated successfully!");
        },
        onError: (error) => {
          toast.error("Update failed", {
            description: error?.message || "Please try again later",
          });
        },
      },
    );
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button size="icon-sm">
          <Pencil className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full ml-auto w-full max-w-md">
        <DrawerHeader className="border-b">
          <DrawerTitle>Edit User</DrawerTitle>
          <DrawerDescription>
            Update member profile and permissions.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto no-scrollbar">
          {isUserLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <form
              id="edit-user-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FieldGroup>
                <Controller
                  name="profile"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Profile Url</FieldLabel>
                      <Input {...field} disabled={isSubmitting} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Full Name</FieldLabel>
                      <Input {...field} disabled={isSubmitting} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email Address</FieldLabel>
                      <Input {...field} type="email" disabled={isSubmitting} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="role"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>System Role</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          )}
        </div>

        <DrawerFooter className="border-t">
          <Button type="submit" form="edit-user-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
