import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Index from "./pages/Index";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminUsers from "./pages/admin/AdminUsers";
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
        {/* Admin routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["admin"]} />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
