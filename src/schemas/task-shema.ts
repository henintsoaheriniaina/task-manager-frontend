import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string("Description is required")
    .min(5, "Description must be at least 5 characters long"),
  status: z.enum(["todo", "in_progress", "completed"]),
  assignedTo: z
    .string("Assignee is required")
    .min(1, "Please select a user to assign this task"),
  dueDate: z.date("Invalid date format"),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskFilterSchema = z.object({
  status: z.enum(["todo", "in_progress", "completed"], "").optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskFilterInput = z.infer<typeof taskFilterSchema>;
