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
import { useCreateTask } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";
import { createTaskSchema, type CreateTaskInput } from "@/schemas/task-shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
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

export function TaskCreateDrawer() {
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const { mutate } = useCreateTask();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      assignedTo: "",
      description: "",
      dueDate: new Date(),
      status: "todo",
      title: "",
    },
  });

  const onSubmit = (data: CreateTaskInput) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
        toast.success("Task created successfully!");
      },
      onError: (error) => {
        toast.error("Error creating task", {
          description: error?.message || "Please try again later",
        });
      },
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button size="sm" className="h-8 ">
          <Plus />
          Add task
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full ml-auto w-full max-w-md">
        <DrawerHeader className="border-b">
          <DrawerTitle>New Task</DrawerTitle>
          <DrawerDescription>
            Fill in the details to track a new piece of work.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto no-scrollbar">
          <form
            id="create-task-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup className="space-y-4">
              {/* Title */}
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. Design system update"
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      {...field}
                      className="resize-none min-h-25"
                      placeholder="Tell us more about this task..."
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
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

                {/* Due Date */}
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
                              ? format(field.value, "MMM d")
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
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>
                  )}
                />
              </div>

              {/* Assignee */}
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
        </div>

        <DrawerFooter className="border-t">
          <Button type="submit" form="create-task-form" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => reset()}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
