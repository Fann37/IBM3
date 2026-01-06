import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/pages.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/students");
      setStudents(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!name.trim()) return alert("Enter student name");
    await API.post("/students", { name });
    setName("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="page-container page-students">
      <h1 className="page-title">Students</h1>

      <div className="card">
        <div className="form-row">
          <input
            placeholder="Student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="primary" onClick={addStudent}>
            Add Student
          </button>
        </div>
      </div>

      <div className="card">
        {loading && <p className="muted">Loading students...</p>}
        {!loading && students.length === 0 && (
          <p className="muted">No students added yet.</p>
        )}

        {!loading &&
          students.map((s) => (
            <div key={s._id} className="list-item">
              <span>{s.name}</span>
              <button className="danger" onClick={() => deleteStudent(s._id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
