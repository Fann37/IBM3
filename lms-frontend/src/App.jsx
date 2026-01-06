import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Enroll from "./pages/Enroll";
import Library from "./pages/Library"; // ✅ THIS WAS MISSING

import "./styles/layout.css";
import "./styles/pages.css";
import "./styles/responsive.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
