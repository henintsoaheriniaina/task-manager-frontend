import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      {/* auth */}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />

      <Route element={<Layout />}>
        {/* User allowed */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Index />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route index element={<Index />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
