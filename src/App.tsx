import { Route, Routes } from "react-router";
import { AuthGuard } from "./components/auth/AuthGuard";
import Redirect from "./components/auth/Redirect";
import DashboardLayout from "./components/layout/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/tasks/AdminTasks";
import AdminUsers from "./pages/admin/users/AdminUsers";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Settings from "./pages/auth/Settings";
import { ErrorPage } from "./pages/ErrorPage";
import AllTasks from "./pages/tasks/AllTasks";
import TasksCalendar from "./pages/tasks/TasksCalendar";
import TodayTasks from "./pages/tasks/TodayTasks";
import UpcomingTasks from "./pages/tasks/UpcomingTasks";
function App() {
  return (
    <Routes>
      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          {/* accessible by auth */}
          <Route index element={<Redirect />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tasks" element={<AllTasks />} />
          <Route path="tasks/upcoming" element={<UpcomingTasks />} />
          <Route path="tasks/today" element={<TodayTasks />} />
          <Route path="tasks/calendar" element={<TasksCalendar />} />

          {/* admin*/}
          <Route element={<AuthGuard allowedRoles={["admin"]} />}>
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="tasks" element={<AdminTasks />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* Global Errors */}
      <Route
        path="/403"
        element={<ErrorPage code="403" title="Access Forbidden" />}
      />
      <Route
        path="*"
        element={<ErrorPage code="404" title="Page Not Found" />}
      />
    </Routes>
  );
}

export default App;
