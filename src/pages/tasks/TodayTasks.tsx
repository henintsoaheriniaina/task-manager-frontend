import { AccessibleTaskGrid } from "@/components/Tasks/AccessibleTasksGrid";
import { TypographyH2 } from "@/components/ui/typography";
import { useGetTodayTasks } from "@/hooks/use-accessible-tasks";

export default function TodayTasks() {
  const { data: tasks, isLoading, isError } = useGetTodayTasks();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TypographyH2 className="text-center m-6">
        Your Today's Tasks
      </TypographyH2>
      <AccessibleTaskGrid
        isError={isError}
        isLoading={isLoading}
        tasks={tasks || []}
      />
    </>
  );
}
