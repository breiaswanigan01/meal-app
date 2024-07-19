// src/Auth/Login.js

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { FaArrowLeft } from "react-icons/fa";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 relative">
        <div className="">
          <Link to="/" className="absolute top-2 left-2 text-emerald-600">
            <FaArrowLeft size={24} /> {/* Home icon arrow */}
          </Link>
          <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>
        </div>
        <form onSubmit={handleSubmit}>
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
        <Link
          to="/signup"
          className="block text-center text-emerald-600 hover:text-emerald-400 mt-4"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
