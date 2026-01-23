export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
