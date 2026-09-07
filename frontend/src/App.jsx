import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expenses from "./pages/Expenses.jsx";
import Lending from "./pages/Lending.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/lending" element={<Lending />} />
        </Routes>
      </main>
    </div>
  );
}
