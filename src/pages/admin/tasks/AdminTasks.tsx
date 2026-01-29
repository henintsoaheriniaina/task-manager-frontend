import { TasksColumns } from "@/components/Tasks/TasksColumns";
import { TasksDataTable } from "@/components/Tasks/TasksDataTable";
import { useGetTasks } from "@/hooks/use-tasks";

const AdminTasks = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasks();
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!tasks) {
    return <p>No users</p>;
  }

  return <TasksDataTable columns={TasksColumns} data={tasks} />;
};
export default AdminTasks;
