import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function ProfilePage() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
    school_name: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/user/${encodeURIComponent(email)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load user");
        }

        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          password: "",
          age: data.age || "",
          school_name: data.school_name || "",
          gender: data.gender || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Fetch user error:", error);
        alert(error.message);
        navigate("/login");
      }
    };

    fetchUser();
  }, [email, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/user/${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: form.first_name,
            last_name: form.last_name,
            password: form.password,
            age: form.age,
            school_name: form.school_name,
            gender: form.gender,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Update failed");
      }

      alert("Profile updated");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your account? This cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/user/${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Delete failed");
      }

      alert("Account deleted");
      navigate("/register");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed: " + error.message);
    }
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <div className="form-container">
        <h1>Profile ({form.email})</h1>
        <form onSubmit={handleUpdate}>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </label>

          <label>
            Age:
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              min={1}
              max={150}
            />
          </label>

          <label>
            School Name:
            <input
              type="text"
              name="school_name"
              value={form.school_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <button type="submit">Update Profile</button>
        </form>

        <button
          className="danger"
          onClick={handleDelete}
          style={{ marginTop: "16px" }}
        >
          Delete Account
        </button>

        <p>
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
