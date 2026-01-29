import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateMyTaskStatus } from "@/hooks/use-accessible-tasks";
import { type Task } from "@/types/tasks";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  ClipboardList,
  Clock,
  SearchX,
} from "lucide-react";
import { useState } from "react";

type AccessibleTaskGridProps = {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  isAdmin?: boolean;
};

export function AccessibleTaskGrid({
  tasks,
  isLoading,
  isError,
  isAdmin,
}: AccessibleTaskGridProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { mutate: updateStatus } = useUpdateMyTaskStatus();

  const filteredTasks = tasks?.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isError) {
    return (
      <EmptyState
        state={{
          icon: AlertCircle,
          title: "Connection Error",
          description:
            "We couldn't fetch your tasks. Please check your connection and try again.",
        }}
      />
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {!isAdmin && (
        <div className="flex flex-col md:flex-row md:justify-center gap-6">
          <Input
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-sm"
            disabled={isLoading}
          />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            disabled={isLoading}
          >
            <SelectTrigger className="md:w-45">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4 max-w-4xl mx-auto w-full">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          state={{
            icon: ClipboardList,
            title: "No Tasks Found",
            description:
              "You don't have any tasks assigned to you at the moment.",
          }}
        />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          state={{
            icon: SearchX,
            title: "No Results",
            description: `No tasks match your search "${search}" or selected filter.`,
          }}
        />
      ) : (
        <Accordion type="multiple" className="contents">
          {filteredTasks.map((task) => (
            <AccordionItem
              key={task._id}
              value={task._id}
              className="border rounded-lg px-6 bg-card max-w-4xl mx-auto w-full mb-6"
            >
              <AccordionTrigger className="hover:no-underline font-semibold text-left">
                {task.title}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    <span>
                      {task.dueDate
                        ? format(new Date(task.dueDate), "dd MMM yyyy")
                        : "No due date"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span className="capitalize">
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md text-sm leading-relaxed">
                  {task.description}
                </div>

                {!isAdmin && (
                  <div className="flex flex-col gap-2 pt-2 border-t">
                    <label className="text-xs font-medium">
                      Change status:
                    </label>
                    <div className="flex gap-2">
                      {["todo", "in_progress", "completed"].map((s) => (
                        <button
                          key={s}
                          onClick={() =>
                            updateStatus({ id: task._id, status: s })
                          }
                          className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                            task.status === s
                              ? "bg-primary text-primary-foreground border-primary"
                              : "hover:bg-muted"
                          }`}
                        >
                          {s.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isAdmin && <div>Admin</div>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
