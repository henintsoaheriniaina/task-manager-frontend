import type { User } from "./user";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: User;
  createdBy: User;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
