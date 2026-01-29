import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  state: {
    title: string;
    description?: string;
    icon: LucideIcon;
  };
};

export function EmptyState({ state }: EmptyStateProps) {
  return (
    <Empty className="py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="mb-4">
          <state.icon />
        </EmptyMedia>
        <EmptyTitle>{state.title}</EmptyTitle>
        {state.description && (
          <EmptyDescription>{state.description}</EmptyDescription>
        )}
      </EmptyHeader>
    </Empty>
  );
}
