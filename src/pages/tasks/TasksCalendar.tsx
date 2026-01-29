import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyTasks } from "@/hooks/use-accessible-tasks";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function TasksCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: tasks, isLoading, isError } = useGetMyTasks();

  const selectedDayTasks = useMemo(() => {
    return (
      tasks?.filter((task) =>
        task.dueDate ? isSameDay(new Date(task.dueDate), date!) : false,
      ) || []
    );
  }, [tasks, date]);

  if (isLoading)
    return (
      <div className="p-8">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-destructive">
        <AlertCircle className="mb-2 size-8" />
        <p className="font-medium">Could not load tasks</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-6 space-y-8">
      {/* Header Section with Inline Date Picker */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and daily objectives.
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal h-12 shadow-sm",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tasks List Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          <ChevronRight className="size-4 text-primary" />
          {selectedDayTasks.length} Tasks for this day
        </div>

        {selectedDayTasks.length > 0 ? (
          <div className="grid gap-3">
            {selectedDayTasks.map((task) => (
              <div
                key={task._id}
                className="group flex items-center justify-between p-5 rounded-2xl border bg-background hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-1 size-3 rounded-full shrink-0",
                      task.status === "completed"
                        ? "bg-green-500"
                        : "bg-primary",
                    )}
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold leading-none group-hover:text-primary transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                        Due at {format(new Date(task.dueDate!), "HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className={cn(
                    "capitalize px-3 py-0.5 rounded-full text-[11px]",
                    task.status === "completed" &&
                      "bg-green-500/10 text-green-600 border-none",
                  )}
                >
                  {task.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
            <ClipboardList className="size-12 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground font-medium">Enjoy your day!</p>
            <p className="text-sm text-muted-foreground/60">
              No tasks scheduled for this date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
