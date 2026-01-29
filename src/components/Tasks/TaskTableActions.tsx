import { useDeleteTask } from "@/hooks/use-tasks";
import type { Task } from "@/types/tasks";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import TaskView from "./TaskView";

type TaskTableActionProps = {
  task: Task;
};
const TaskTableAction = ({ task }: TaskTableActionProps) => {
  const { mutate: deleteTask } = useDeleteTask();
  const onDelete = () => {
    deleteTask(task._id, {
      onSuccess: () => {
        toast.success("Task deleted");
      },
      onError: () => {
        toast.error("error");
      },
    });
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <Button size={"icon-sm"}>
        <Edit />
      </Button>
      <TaskView id={task._id} />
      <Button size={"icon-sm"} variant={"destructive"} onClick={onDelete}>
        <Trash2 />
      </Button>
    </div>
  );
};
export default TaskTableAction;
