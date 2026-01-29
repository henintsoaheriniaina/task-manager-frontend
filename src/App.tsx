import { Route, Routes } from "react-router";
import Redirect from "./components/auth/Redirect";
import AccessibleLayout from "./components/layout/AccessibleLayout";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/tasks/AdminTasks";
import AdminUsers from "./pages/admin/users/AdminUsers";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Settings from "./pages/auth/Settings";
import AllTasks from "./pages/tasks/AllTasks";
import TasksCalendar from "./pages/tasks/TasksCalendar";
import TodayTasks from "./pages/tasks/TodayTasks";
import UpcomingTasks from "./pages/tasks/UpcomingTasks";

function App() {
  return (
    <Routes>
      {/* auth */}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />

      {/* User allowed */}
      <Route index element={<Redirect />} />
      <Route element={<AccessibleLayout />}>
        <Route path="settings" element={<Settings />} />
        <Route path="tasks">
          <Route index element={<AllTasks />} />
          <Route path="upcoming" element={<UpcomingTasks />} />
          <Route path="today" element={<TodayTasks />} />
          <Route path="calendar" element={<TasksCalendar />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="tasks" element={<AdminTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
