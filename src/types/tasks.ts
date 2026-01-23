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
  assignedTo?: string;
  createdBy: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
