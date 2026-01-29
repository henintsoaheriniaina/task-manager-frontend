import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "../ui/DataTableFacetedFilter";
import { DataTableViewOptions } from "../ui/DataTableViewOptions";
import { TaskCreateDrawer } from "./TaskCreateDrawer";

const statuses = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TaskDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-37.5 lg:w-62.5"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
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
        <TaskCreateDrawer />
      </div>
    </div>
  );
}
