import { useGetTask } from "@/hooks/use-tasks";
import { formatDate } from "@/utils/format-date";
import { AlignLeft, Calendar, Eye, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { TypographyH2 } from "../ui/typography";
import { TaskStatusCell } from "./TaskStatusCell";
type TaskViewProps = {
  id: string;
};
const TaskView = ({ id }: TaskViewProps) => {
  const { data: task, isLoading } = useGetTask(id);
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size={"icon-sm"}>
          <Eye />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Task Details</DrawerTitle>
          <DrawerDescription>
            View all information about this task.
          </DrawerDescription>
        </DrawerHeader>
        <div className=" no-scrollbar overflow-y-auto px-4">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              Loading task details...
            </div>
          ) : task ? (
            <div className="space-y-6 w-full">
              <div className="space-y-1 w-full">
                <TypographyH2>{task.title}</TypographyH2>
                <TaskStatusCell status={task.status} />
              </div>

              <div className="grid gap-6">
                {/* Description */}
                <div className="flex gap-3">
                  <AlignLeft className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {task.description || "No description provided."}
                    </p>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex gap-3">
                  <Calendar className="mt-1 size-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Schedule</p>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4">
                        <span>Due Date:</span>
                        <span className="font-medium text-foreground">
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Created:</span>
                        <span>{formatDate(task.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <User className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div className="w-full space-y-3">
                    <p className="text-sm font-medium">People</p>

                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-xs text-muted-foreground ml-2">
                        Assigned to:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {task.assignedTo?.name}
                        </span>
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={task.assignedTo?.profile} />
                          <AvatarFallback>
                            {task.assignedTo?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-dashed p-2">
                      <span className="text-xs text-muted-foreground ml-2">
                        Created by:
                      </span>
                      <div className="flex items-center gap-2 opacity-80">
                        <span className="text-sm">{task.createdBy?.name}</span>
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={task.createdBy?.profile} />
                          <AvatarFallback>
                            {task.createdBy?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-destructive">
              Task not found.
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default TaskView;
