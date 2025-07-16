
import React, { useState } from "react";
import axios from "axios";
import "../components/Login.css";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [view, setView] = useState("login"); // 'login' | 'signup' | 'forgot' | 'otp'
  const navigate=useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchView = (newView) => {
    setMessage({ type: "", text: "" });
    setForm({ name: "", email: "", password: "", otp: "" });
    setView(newView);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      const baseURL = "https://login-backend-two.vercel.app/api/auth"; // change if needed

      if (view === "signup") {
        res = await axios.post(`${baseURL}/signup`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMessage({ type: "success", text: res.data.message });
        setView("login");
        
      }

      if (view === "login") {
        res = await axios.post(`${baseURL}/login`, {
          email: form.email,
          password: form.password,
        });
        setMessage({ type: "success", text: res.data.message });
        localStorage.setItem("login", JSON.stringify(true));
        navigate('/home');
      }

      if (view === "forgot") {
        res = await axios.post(`${baseURL}/forgot-password`, {
          email: form.email,
        });
        setMessage({ type: "success", text: res.data.message });
        setView("otp");
      }

      if (view === "otp") {
        res = await axios.post(`${baseURL}/verify-otp`, {
          email: form.email,
          otp: form.otp,
        });
        setMessage({ type: "success", text: res.data.message });
        localStorage.setItem("login", JSON.stringify(true));
        navigate('/home');
      }
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err?.response?.data?.error ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <h2>
        {view === "login"
          ? "Login"
          : view === "signup"
          ? "Sign Up"
          : view === "forgot"
          ? "Forgot Password"
          : "Enter OTP"}
      </h2>

      {message.text && (
        <div className={message.type === "error" ? "error-msg" : "success-msg"}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {view === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        {(view === "signup" ||
          view === "login" ||
          view === "forgot" ||
          view === "otp") && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        )}

        {(view === "signup" || view === "login") && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}

        {view === "otp" && (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">
          {view === "login"
            ? "Login"
            : view === "signup"
            ? "Sign Up"
            : view === "forgot"
            ? "Send OTP"
            : "Verify OTP"}
        </button>
      </form>

      <div className="auth-toggle">
        {view === "login" && (
          <>
            Don't have an account?{" "}
            <span onClick={() => switchView("signup")}>Sign Up</span> <br />
            <span onClick={() => switchView("forgot")}>Forgot Password?</span>
          </>
        )}

        {view === "signup" && (
          <>
            Already have an account?{" "}
            <span onClick={() => switchView("login")}>Login</span>
          </>
        )}

        {(view === "forgot" || view === "otp") && (
          <span onClick={() => switchView("login")}>Back to Login</span>
        )}
      </div>
    </div>
    </div>
  );
};

export default Auth;
