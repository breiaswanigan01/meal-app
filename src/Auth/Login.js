// src/Auth/Login.js

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "./firebase";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl">Log In</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-emerald-600 text-white p-2 rounded"
          >
            Log In
          </button>
        </form>
        <div className="p-4 border-t">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
