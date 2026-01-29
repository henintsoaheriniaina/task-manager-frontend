import api from "@/axios/api";
import type { CreateUserInput, UpdateUserInput } from "@/schemas/user.schema";
import type { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const USERS_QUERY_KEY = "users";
const useGetUsers = () =>
  useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get<{ users: User[] }>("/users");
      return data.users;
    },
  });

const useGetUser = (id: string) =>
  useQuery({
    queryKey: [USERS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<{ user: User }>(`/users/${id}`);
      return data.user;
    },
    enabled: !!id,
  });

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: CreateUserInput) => {
      const { data } = await api.post<{ user: User }>("/users", newUser);
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: UpdateUserInput & { id: string }) => {
      const { data } = await api.put<{ user: User }>(`/users/${id}`, payload);
      return data.user;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY, updatedUser._id],
      });
    },
  });
};
const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/users/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

export { useCreateUser, useDeleteUser, useGetUser, useGetUsers, useUpdateUser };
