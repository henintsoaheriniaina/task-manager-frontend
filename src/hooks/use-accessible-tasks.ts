import api from "@/axios/api";
import type { Task } from "@/types/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ACCESSIBLE_TASKS_KEY = "accessible-tasks";

const useGetMyTasks = () =>
  useQuery({
    queryKey: [ACCESSIBLE_TASKS_KEY, "all"],
    queryFn: async () => {
      const { data } = await api.get<{ tasks: Task[] }>("/accessible/my-tasks");
      return data.tasks;
    },
  });

const useGetTodayTasks = () =>
  useQuery({
    queryKey: [ACCESSIBLE_TASKS_KEY, "today"],
    queryFn: async () => {
      const { data } = await api.get<{ tasks: Task[] }>("/accessible/today");
      return data.tasks;
    },
  });

const useGetUpcomingTasks = () =>
  useQuery({
    queryKey: [ACCESSIBLE_TASKS_KEY, "upcoming"],
    queryFn: async () => {
      const { data } = await api.get<{ tasks: Task[] }>("/accessible/upcoming");
      return data.tasks;
    },
  });

const useUpdateMyTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await api.patch<{ task: Task }>(
        `/accessible/my-tasks/${id}/status`,
        { status },
      );
      return data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACCESSIBLE_TASKS_KEY] });
      toast.success("Task status Updated");
    },
  });
};

export {
  useGetMyTasks,
  useGetTodayTasks,
  useGetUpcomingTasks,
  useUpdateMyTaskStatus,
};
