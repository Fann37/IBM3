import { useEffect, useState } from "react";
import { courseStore } from "../services/store";
import "../styles/pages.css";

export default function Courses() {
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(courseStore.getCourses());
  }, []);

  const addCourse = () => {
    if (!courseName.trim()) return alert("Enter course name");

    courseStore.addCourse({
      id: Date.now(),
      name: courseName
    });

    setCourses(courseStore.getCourses());
    setCourseName("");
  };

  return (
    <div className="page-container page-courses">
      <h1 className="page-title">Courses</h1>

      <div className="card">
        <div className="form-row">
          <input
            placeholder="Course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <button className="primary" onClick={addCourse}>
            Add Course
          </button>
        </div>
      </div>

      <div className="card">
        {courses.length === 0 && <p className="muted">No courses added yet.</p>}
        {courses.map((c) => (
          <div key={c.id} className="list-item">
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
