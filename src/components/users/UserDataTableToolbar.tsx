import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "../ui/DataTableFacetedFilter";
import { DataTableViewOptions } from "../ui/DataTableViewOptions";
import { UserCreateDrawer } from "./UserCreateDrawer";

const roles = [
  { label: "Administrator", value: "admin" },
  { label: "User", value: "user" },
];

interface UserDataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UserDataTableToolbar<TData>({
  table,
}: UserDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search users (name, email...)"
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />

        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <UserCreateDrawer />
      </div>
    </div>
  );
}
