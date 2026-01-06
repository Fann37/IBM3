import { useEffect, useState } from "react";
import API from "../services/api";
import { courseStore, enrollStore } from "../services/store";
import "../styles/pages.css";

export default function Enroll() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    API.get("/students").then((res) => setStudents(res.data));
    setCourses(courseStore.getCourses());
    setEnrollments(enrollStore.getEnrollments()); // ✅ LOAD OLD DATA
  }, []);

  const enrollStudent = () => {
    if (!studentId || !courseId) {
      return alert("Select student and course");
    }

    const student = students.find((s) => s._id === studentId);
    const course = courses.find((c) => c.id === Number(courseId));

    const enrollment = {
      id: Date.now(),
      student: student.name,
      course: course.name
    };

    enrollStore.addEnrollment(enrollment); // ✅ SAVE
    setEnrollments(enrollStore.getEnrollments());
  };

  return (
    <div className="page-container page-enroll">
      <h1 className="page-title">Enroll Student</h1>

      {/* Enrollment Form */}
      <div className="card">
        <div className="form-row">
          <select onChange={(e) => setStudentId(e.target.value)}>
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <select onChange={(e) => setCourseId(e.target.value)}>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button className="primary" onClick={enrollStudent}>
            Enroll
          </button>
        </div>
      </div>

      {/* Enrollment List */}
      <div className="card">
        {enrollments.length === 0 && (
          <p className="muted">No enrollments yet.</p>
        )}

        {enrollments.map((e) => (
          <div key={e.id} className="list-item">
            {e.student} → {e.course}
          </div>
        ))}
      </div>
    </div>
  );
}
