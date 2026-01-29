import { AccessibleTaskGrid } from "@/components/Tasks/AccessibleTasksGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyLarge } from "@/components/ui/typography";
import { useGetTasks } from "@/hooks/use-tasks";
import { CheckCircle2, ClipboardList, Clock, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: tasks, isLoading, isError } = useGetTasks();
  const statsData = [
    {
      status: "To Do",
      count: tasks?.filter((t) => t.status === "todo").length || 0,
    },
    {
      status: "In Progress",
      count: tasks?.filter((t) => t.status === "in_progress").length || 0,
    },
    {
      status: "Completed",
      count: tasks?.filter((t) => t.status === "completed").length || 0,
    },
  ];
  return (
    <div className="space-y-8 mt-8 ">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={tasks?.length || 0}
          icon={<ClipboardList className="size-4" />}
        />
        <StatCard
          title="In Progress"
          value={statsData[1].count}
          icon={<Clock className="size-4 text-blue-500" />}
        />
        <StatCard
          title="Completed"
          value={statsData[2].count}
          icon={<CheckCircle2 className="size-4 text-green-500" />}
        />
        <StatCard
          title="Upcoming"
          value={
            tasks?.filter((t) => new Date(t.dueDate!) > new Date()).length || 0
          }
          icon={<TrendingUp className="size-4" />}
        />
      </div>
      <TypographyLarge className="text-center">
        Recently created tasks
      </TypographyLarge>
      <AccessibleTaskGrid
        isError={isError}
        isLoading={isLoading}
        tasks={tasks?.slice(0, 6) || []}
        isAdmin
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card p-4 rounded-xl border">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <TypographyLarge>{title}</TypographyLarge>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Skeleton className="col-span-4 h-100" />
        <Skeleton className="col-span-3 h-100" />
      </div>
    </div>
  );
}
