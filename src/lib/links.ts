import {
  Calendar,
  ChartBarBig,
  ChevronsRight,
  Clipboard,
  List,
  ListChecks,
  Users,
  type LucideIcon,
} from "lucide-react";
export type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isProtected: boolean;
};
const sidebarGroups = [
  {
    groupTitle: "Admin",
    isProtected: true,
    links: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: ChartBarBig,
        isProtected: true,
      },
      {
        title: "Tasks",
        url: "/admin/tasks",
        icon: ListChecks,
        isProtected: true,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        isProtected: true,
      },
    ],
  },

  {
    groupTitle: "Tasks",
    isProtected: false,

    links: [
      {
        title: "Assigned Tasks",
        url: "/tasks",
        icon: Clipboard,
        isProtected: false,
      },
      {
        title: "Upcoming",
        url: "/tasks/upcoming",
        icon: ChevronsRight,
        isProtected: false,
      },
      {
        title: "Today",
        url: "/tasks/today",
        icon: List,
        isProtected: false,
      },
      {
        title: "Calendar",
        url: "/tasks/calendar",
        icon: Calendar,
        isProtected: false,
      },
    ],
  },
];

export default sidebarGroups;
