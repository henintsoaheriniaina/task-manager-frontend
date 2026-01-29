import { useDeleteUser } from "@/hooks/use-users";
import type { User } from "@/types/user";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { UserEditDrawer } from "./UserEditDrawer";
import UserView from "./UserView";

type UserTableActionsProps = {
  user: User;
};
const UserTableActions = ({ user }: UserTableActionsProps) => {
  const { mutate: deleteUser } = useDeleteUser();
  const onDelete = () => {
    deleteUser(user._id, {
      onSuccess: () => {
        toast.success("User deleted");
      },
      onError: () => {
        toast.error("error");
      },
    });
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <UserEditDrawer id={user._id} />
      <UserView id={user._id} />

      <Button size={"icon-sm"} variant={"destructive"} onClick={onDelete}>
        <Trash2 />
      </Button>
    </div>
  );
};
export default UserTableActions;
