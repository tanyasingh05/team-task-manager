import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;