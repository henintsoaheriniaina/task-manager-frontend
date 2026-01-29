import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Index from "./pages/Index";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/tasks/AdminTasks";
import ShowTask from "./pages/admin/tasks/ShowTask";
import AdminUsers from "./pages/admin/users/AdminUsers";
import ShowUser from "./pages/admin/users/ShowUser";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
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

      <Route path="/" element={<Layout />}>
        {/* Admin routes */}
        <Route
          path="admin"
          element={<ProtectedRoute allowedRoles={["admin"]} />}
        >
          <Route index element={<AdminDashboard />} />

          {/* users */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<ShowUser />} />

          {/* tasks */}
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="tasks/:id" element={<ShowTask />} />
        </Route>

        {/* User allowed */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Index />} />
          <Route path="tasks">
            <Route index element={<AllTasks />} />
            <Route path="upcoming" element={<UpcomingTasks />} />
            <Route path="today" element={<TodayTasks />} />
            <Route path="calendar" element={<TasksCalendar />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
