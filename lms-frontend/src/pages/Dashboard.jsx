import { useEffect, useState } from "react";
import API from "../services/api";
import { courseStore } from "../services/store";
import "../styles/pages.css";

export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const studentsRes = await API.get("/students");
        setStudentsCount(studentsRes.data.length);

        const booksRes = await API.get("/books");
        setBooksCount(booksRes.data.length);

        setCoursesCount(courseStore.getCourses().length);
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <p className="muted">Loading dashboard data…</p>
      </div>
    );
  }

  return (
    <div className="page-container page-dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="grid-3">
        <div className="card stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{studentsCount}</p>
          <p className="muted">Active learners</p>
        </div>

        <div className="card stat-card">
          <h3>Total Courses</h3>
          <p className="stat-number">{coursesCount}</p>
          <p className="muted">Available programs</p>
        </div>

        <div className="card stat-card">
          <h3>Total Books</h3>
          <p className="stat-number">{booksCount}</p>
          <p className="muted">Library resources</p>
        </div>
      </div>

      <div className="card">
        <h3>Welcome to the Learning Management System</h3>
        <p className="muted">
          Use this dashboard to manage students, courses, enrollments, and
          library resources efficiently. All statistics update automatically
          as data changes.
        </p>
      </div>
    </div>
  );
}
