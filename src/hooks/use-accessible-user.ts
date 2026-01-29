import api from "@/axios/api";
import type {
  ChangePasswordInput,
  UpdateUserInput,
} from "@/schemas/user.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateUserInput) => {
      const { data } = await api.patch("/accessible/profile/update", payload);
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success("Profile updated successfully");
    },
    onError: () => toast.error("Failed to update profile"),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (payload: ChangePasswordInput) => {
      const { data } = await api.patch(
        "/accessible/profile/change-password",
        payload,
      );
      return data;
    },
    onSuccess: () => toast.success("Password changed successfully"),
    onError: (error: any) =>
      toast.error(error.response?.data?.message || "Failed to change password"),
  });
};
