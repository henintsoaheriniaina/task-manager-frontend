import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Timer } from "lucide-react";

const statusConfig = {
  todo: {
    label: "Todo",
    icon: Circle,
    className:
      "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20",
  },
  in_progress: {
    label: "In Progress",
    icon: Timer,
    className:
      "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20",
  },
};

export const TaskStatusCell = ({ status }: { status: string }) => {
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.todo;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex w-fit items-center gap-1.5 font-medium px-2 py-0.5 capitalize",
        config.className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </Badge>
  );
};
