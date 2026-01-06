import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>LMS Admin</h2>
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/students">Students</a></li>
        <li><a href="/enroll">Enroll</a></li>
        <li><a href="/library">Library</a></li>

      </ul>
    </aside>
  );
}
