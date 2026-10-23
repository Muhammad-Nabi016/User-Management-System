
import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  UserRound
} from "lucide-react";
import "./App.css";

const API = "http://localhost:3000/api/users";

const emptyForm = {
  name: "",
  email: "",
  age: ""
};

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load users.");
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        "Users load nahi ho sakay. Check karo ke backend http://localhost:3000 par run ho raha hai."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setMessage("");
    setError("");
  }

  function openEditForm(user) {
    setForm({
      name: user.name || "",
      email: user.email || "",
      age: user.age ?? ""
    });
    setEditingId(user._id);
    setShowForm(true);
    setMessage("");
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      ...(form.age !== "" ? { age: Number(form.age) } : {})
    };

    const url = editingId
      ? `${API}/${editingId}`
      : API;

    try {
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save user.");
      }

      closeForm();
      setMessage(
        editingId
          ? "User updated successfully."
          : "User added successfully."
      );

      await loadUsers();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser(user) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/${user._id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete user.");
      }

      setMessage("User deleted successfully.");
      await loadUsers();
    } catch (err) {
      setError(err.message || "Could not delete user.");
    }
  }

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      (user.name || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Users size={23} />
          </div>
          <div>
            <h2>UserFlow</h2>
            <span>Management System</span>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <div className="nav-item active">
          <Users size={19} />
          <span>All Users</span>
        </div>

        <div className="sidebar-note">
          <div className="note-icon">
            <UserRound size={19} />
          </div>
          <strong>Manage your team</strong>
          <p>Keep user information organized in one place.</p>
        </div>

        <div className="sidebar-footer">
          Full Stack Project
          <span>React · Express · MongoDB</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / USERS</p>
            <h1>User Management</h1>
            <p className="subtitle">
              Manage and organize your users easily.
            </p>
          </div>

          <button className="primary-btn" onClick={openAddForm}>
            <UserPlus size={18} />
            Add New User
          </button>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">
              <Users size={22} />
            </div>
            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
              <span>Stored in MongoDB</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <UserRound size={22} />
            </div>
            <div>
              <p>Search Results</p>
              <h2>{filteredUsers.length}</h2>
              <span>Users matching your search</span>
            </div>
          </div>
        </section>

        <section className="table-card">
          <div className="table-heading">
            <div>
              <h2>All Users</h2>
              <p>View and manage your user records.</p>
            </div>

            <button
              className="refresh-btn"
              onClick={loadUsers}
              title="Refresh users"
            >
              <RefreshCw size={17} />
              Refresh
            </button>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <span className="result-count">
              {filteredUsers.length} user(s)
            </span>
          </div>

          {message && <div className="success-alert">{message}</div>}
          {error && <div className="error-alert">{error}</div>}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>USER</th>
                  <th>EMAIL ADDRESS</th>
                  <th>AGE</th>
                  <th>USER ID</th>
                  <th className="actions-heading">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      <Users size={32} />
                      <strong>No users found</strong>
                      <span>Try another search or add a new user.</span>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-cell">
                          <div className="avatar">
                            {(user.name || "?")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <strong>{user.name}</strong>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.age ?? "—"}</td>
                      <td>
                        <span className="id-text">
                          {(user._id || "").slice(-8)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="icon-btn edit-btn"
                            onClick={() => openEditForm(user)}
                            title="Edit user"
                            aria-label="Edit user"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="icon-btn delete-btn"
                            onClick={() => deleteUser(user)}
                            title="Delete user"
                            aria-label="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="page-footer">
          UserFlow · Built with React, Express.js and MongoDB Atlas
        </footer>
      </main>

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">
                  USER MANAGEMENT
                </p>
                <h2 id="form-title">
                  {editingId ? "Edit User" : "Add New User"}
                </h2>
              </div>

              <button
                className="close-btn"
                onClick={closeForm}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />

              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />

              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                min="0"
                placeholder="Enter age (optional)"
                value={form.age}
                onChange={(event) =>
                  setForm({ ...form, age: event.target.value })
                }
              />

              {error && <div className="error-alert">{error}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Create User"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
