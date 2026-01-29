import { AccessibleTaskGrid } from "@/components/Tasks/AccessibleTasksGrid";
import { TypographyH2 } from "@/components/ui/typography";
import { useGetMyTasks } from "@/hooks/use-accessible-tasks";

export default function AllTasks() {
  const { data: tasks, isLoading, isError } = useGetMyTasks();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <TypographyH2 className="text-center m-6">
        Your Assigned Tasks
      </TypographyH2>
      <AccessibleTaskGrid
        isError={isError}
        isLoading={isLoading}
        tasks={tasks || []}
      />
    </>
  );
}
