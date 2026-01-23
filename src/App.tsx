import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  );
}

export default App;
