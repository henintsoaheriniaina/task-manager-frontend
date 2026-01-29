import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const ViewUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem>
          <Eye />
          View
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mor info about user</DialogTitle>
        </DialogHeader>
        okokokok
      </DialogContent>
    </Dialog>
  );
};
export default ViewUser;
