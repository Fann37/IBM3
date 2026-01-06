import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/pages.css";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const loadBooks = async () => {
    setLoading(true);
    const res = await API.get("/books");
    setBooks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const addBook = async () => {
    const { title, author, category, publishedYear, availableCopies } = form;
    if (!title || !author || !category || !publishedYear || !availableCopies) {
      return alert("All fields are required");
    }

    await API.post("/books", {
      title,
      author,
      category,
      publishedYear: Number(publishedYear),
      availableCopies: Number(availableCopies)
    });

    setForm({
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      availableCopies: ""
    });

    loadBooks();
  };

  return (
    <div className="page-container page-library">
      <h1 className="page-title">Library</h1>

      <div className="card grid-form">
        <input
          placeholder="Book Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Published Year"
          value={form.publishedYear}
          onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
        />
        <input
          type="number"
          placeholder="Copies"
          value={form.availableCopies}
          onChange={(e) =>
            setForm({ ...form, availableCopies: e.target.value })
          }
        />
        <button className="primary" onClick={addBook}>
          Add Book
        </button>
      </div>

      <div className="card">
        {loading && <p className="muted">Loading books...</p>}
        {!loading && books.length === 0 && <p>No books available.</p>}

        {books.map((b) => (
          <div key={b._id} className="table-row">
            <div>
              <strong>{b.title}</strong>
              <div className="muted">
                {b.author} | {b.category} | {b.publishedYear}
              </div>
            </div>
            <span className="badge">{b.availableCopies} copies</span>
          </div>
        ))}
      </div>
    </div>
  );
}
