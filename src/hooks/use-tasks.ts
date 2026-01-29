import api from "@/axios/api";
import type { CreateTaskInput } from "@/schemas/task-shema";
import type { UpdateUserInput } from "@/schemas/user.schema";
import useAuthStore from "@/stores/auth-store";
import type { Task } from "@/types/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const TASKS_QUERY_KEY = "tasks";
const useGetTasks = () =>
  useQuery({
    queryKey: [TASKS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get<{ tasks: Task[] }>("/tasks");
      return data.tasks;
    },
  });

const useGetTask = (id: string) =>
  useQuery({
    queryKey: [TASKS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<{ task: Task }>(`/tasks/${id}`);
      return data.task;
    },
    enabled: !!id,
  });

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore.use.user();

  return useMutation({
    mutationFn: async (newTask: CreateTaskInput) => {
      const { data } = await api.post<{ task: Task }>("/tasks", {
        ...newTask,
        createdBy: user!._id,
      });
      return data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: UpdateUserInput & { id: string }) => {
      const { data } = await api.put<{ task: Task }>(`/tasks/${id}`, payload);
      return data.task;
    },
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY, updatedTask._id],
      });
    },
  });
};
const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/tasks/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export { useCreateTask, useDeleteTask, useGetTask, useGetTasks, useUpdateTask };
