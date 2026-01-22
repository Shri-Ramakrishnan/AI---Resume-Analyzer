import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnalysisDetail from "./pages/AnalysisDetail";
import History from "./pages/History";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/analysis/:id"
          element={
            <Layout>
              <AnalysisDetail />
            </Layout>
          }
        />

        <Route
          path="/history"
          element={
            <Layout>
              <History />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
