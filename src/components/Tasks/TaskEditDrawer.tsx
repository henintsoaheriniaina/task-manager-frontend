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
import { useGetTask, useUpdateTask } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";
import { createTaskSchema, type CreateTaskInput } from "@/schemas/task-shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { SelectUser } from "./SelectUser";

type TaskEditDrawerProps = {
  id: string;
};

export function TaskEditDrawer({ id }: TaskEditDrawerProps) {
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const { data: task, isLoading: isTaskLoading } = useGetTask(id);
  const { mutate: updateTask } = useUpdateTask();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        status: task.status,
        assignedTo: task.assignedTo?._id,
        dueDate: new Date(task.dueDate),
      });
    }
  }, [task, reset]);

  const onSubmit = (data: CreateTaskInput) => {
    updateTask(
      { id, ...data },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Task updated successfully!");
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
          <Pencil />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full ml-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>Edit Task</DrawerTitle>
          <DrawerDescription>Modify the task details below.</DrawerDescription>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto no-scrollbar">
          {isTaskLoading ? (
            <div className="flex h-40 items-center justify-center">
              Loading...
            </div>
          ) : (
            <form
              id="edit-task-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FieldGroup className="space-y-4">
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Title</FieldLabel>
                      <Input {...field} disabled={isSubmitting} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        {...field}
                        className="resize-none"
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Status</FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in_progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Due Date</FieldLabel>
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "MMM d, yyyy")
                                : "Pick date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(d) => {
                                field.onChange(d);
                                setDateOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="assignedTo"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Assigned to</FieldLabel>
                      <SelectUser
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isSubmitting}
                      />
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
          <Button type="submit" form="edit-task-form" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Save Changes"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
