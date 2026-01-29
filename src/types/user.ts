import type { Task } from "./tasks";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  assignedTasks: Task[];
  createdTasks: Task[];
}
