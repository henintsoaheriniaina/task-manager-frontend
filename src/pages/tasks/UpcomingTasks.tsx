import { AccessibleTaskGrid } from "@/components/Tasks/AccessibleTasksGrid";
import { TypographyH2 } from "@/components/ui/typography";
import { useGetUpcomingTasks } from "@/hooks/use-accessible-tasks";

export default function UpcomingTasks() {
  const { data: tasks, isLoading, isError } = useGetUpcomingTasks();
  return (
    <>
      <TypographyH2 className="text-center m-6">
        Your Upcoming Tasks
      </TypographyH2>
      <AccessibleTaskGrid
        isError={isError}
        isLoading={isLoading}
        tasks={tasks || []}
      />
    </>
  );
}
