import React, { useEffect, useState } from "react";
import { getMembers, addMember, deleteMember } from "../Services/MemberService";
import "./Members.css";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await getMembers();
      setMembers(res.data);
    } catch (err) {
      setError("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await addMember(form);
      setForm({ name: "", email: "", phone: "" });
      fetchMembers();
    } catch {
      setError("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteMember(id);
      fetchMembers();
    } catch {
      setError("Failed to delete member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Member Management</h2>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <h3>Add New Member</h3>

        <div className="form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

          <button onClick={handleSave} disabled={loading}>
            {loading ? "Processing..." : "Add Member"}
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Members List</h3>

        {loading ? (
          <p className="loading">Loading members...</p>
        ) : members.length === 0 ? (
          <p className="empty">No members found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.phone}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(m.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
