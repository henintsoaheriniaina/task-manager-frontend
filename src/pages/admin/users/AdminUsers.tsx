import { UsersColums } from "@/components/users/UsersColums";
import { UsersDataTable } from "@/components/users/UsersDataTable";
import { useGetUsers } from "@/hooks/use-users";

const AdminUsers = () => {
  const { data: users, isLoading, isError, error } = useGetUsers();
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!users) {
    return <p>No users found</p>;
  }

  return <UsersDataTable columns={UsersColums} data={users} />;
};
export default AdminUsers;
