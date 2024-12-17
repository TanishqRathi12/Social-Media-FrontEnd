import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Components/axios";
import { useAuth } from "../Context/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.post("/createUser", {
          username,
          email,
          password,
        });
        const { token } = response.data;
        localStorage.setItem("token", token);
        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        signup();
        navigate("/");
      } catch (err) {
        setErrorMessage("Failed to create account. Please check your details and try again." || err.message ); 
        setUsername("");
        setEmail("");
        setPassword("");
      } finally {
        setLoading(false);
      }
    },
    [username, email, password, navigate, loading, signup]
  );

  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-white mb-4">Welcome to KnackX 🌟</h1>
        <p className="text-lg text-gray-100">
          Unlock your potential by signing up today. Let's start your journey with us!
        </p>
      </div>
      {loading && (
        <div className="mb-4 text-yellow-300 text-center text-sm">
          Request taking longer due free Hosting
        </div>
      )}

      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition duration-500 ease-in-out"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full py-2 px-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full py-2 px-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full py-2 px-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center text-sm">{errorMessage}</div>
        )}
        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-6 text-center text-white">
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
