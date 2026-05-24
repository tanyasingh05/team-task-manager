import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  document.title = "Signup | Team Task Manager";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", formData);

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
        }}
      >
        <h1 style={{ color: "white", textAlign: "center" }}>Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ padding: "10px" }}
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;