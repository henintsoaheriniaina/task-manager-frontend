import type { Task } from "@/types/tasks";
import { formatDate } from "@/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/DataTableColumnHeader";
import { TaskStatusCell } from "./TaskStatusCell";
import TaskTableAction from "./TaskTableActions";

export const TasksColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string;

      const truncated =
        description.length > 20
          ? description.substring(0, 30) + "..."
          : description;

      return <div title={description}>{truncated}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <TaskStatusCell status={row.getValue("status")} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      return <TaskTableAction task={task} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
