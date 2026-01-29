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
import { useCreateUser } from "@/hooks/use-users";
import { createUserSchema, type CreateUserInput } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
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

export function UserCreateDrawer() {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profile: "",
      role: "user",
    },
  });

  const onSubmit = (data: CreateUserInput) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
        toast.success("User created successfully!");
      },
      onError: (error) => {
        toast.error("Error", { description: error?.message });
      },
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="size-4" />
          Add User
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full ml-auto w-full max-w-md">
        <DrawerHeader className="border-b">
          <DrawerTitle>Create User</DrawerTitle>
          <DrawerDescription>Add a new member to your team.</DrawerDescription>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto no-scrollbar">
          <form
            id="create-user-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
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
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input {...field} type="password" disabled={isSubmitting} />
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>

        <DrawerFooter className="border-t">
          <Button type="submit" form="create-user-form" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
