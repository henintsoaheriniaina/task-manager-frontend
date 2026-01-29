import { useGetUser } from "@/hooks/use-users";
import type { Task } from "@/types/tasks";
import { formatDate } from "@/utils/format-date";
import { Calendar, Eye, ListChecks, Mail, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Separator } from "../ui/separator";

type UserViewProps = {
  id: string;
};

const UserView = ({ id }: UserViewProps) => {
  const { data: userData, isLoading } = useGetUser(id);
  const user = userData;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size={"icon-sm"}>
          <Eye />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full ml-auto w-full max-w-md">
        <DrawerHeader className="border-b">
          <DrawerTitle>User Profile</DrawerTitle>
          <DrawerDescription>
            Detailed information and activity for this account.
          </DrawerDescription>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center text-muted-foreground">
              Loading user details...
            </div>
          ) : user ? (
            <div className="space-y-8">
              {/* Profile Section */}
              <div className="flex flex-col items-center text-center space-y-3">
                <Avatar className="h-20 w-20 border-2 border-primary/10">
                  <AvatarImage src={user.profile} alt={user.name} />
                  <AvatarFallback className="text-xl">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      <ShieldCheck className="mr-1 size-3" />
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Contact & Info */}
              <div className="grid gap-4 text-sm bg-muted/30 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>Joined on {formatDate(user.createdAt)}</span>
                </div>
              </div>

              <Separator />

              {/* Activity Stats (Virtuals from Backend) */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <ListChecks className="size-4 text-primary" />
                  Task Statistics
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">
                      Assigned
                    </p>
                    <p className="text-2xl font-bold">
                      {user.assignedTasks?.length || 0}
                    </p>
                  </div>
                  <div className="border rounded-lg p-3 space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">
                      Created
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {user.createdTasks?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Assigned Tasks Snippet */}
              {user.assignedTasks && user.assignedTasks.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Recent Assignments</p>
                  <div className="space-y-2">
                    {user.assignedTasks.slice(0, 3).map((task: Task) => (
                      <div
                        key={task._id}
                        className="text-xs flex items-center justify-between p-2 bg-background border rounded-md"
                      >
                        <span className="truncate max-w-37.5 font-medium">
                          {task.title}
                        </span>
                        <Badge variant="outline" className="text-[10px] h-5">
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-destructive">
              User not found.
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserView;
