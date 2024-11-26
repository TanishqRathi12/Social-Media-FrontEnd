import React, { useState, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Components/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading) return;

      setLoading(true);
      setLoadingMessage("Request taking longer due to backend being inactive on free hosting. First time may take 30-40 seconds");
      try {
        const response = await axios.post("/login", {
          email,
          password,
        });
        const { token } = response.data;
        localStorage.setItem("token", token);
        login();
        setEmail("");
        setPassword("");
        setErrorMessage("");
        setLoadingMessage("");
        navigate("/");
      } catch (err) {
        console.log(err.message);
        setErrorMessage("Invalid email or password. Please try again." || err.message);
        setLoadingMessage("");
      } finally {
        setLoading(false);
      }
    },
    [email, password, login, navigate, loading]
  );

  return (
    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 min-h-screen flex items-center justify-center relative">
      <div className="absolute top-10 text-center animate-bounce z-10 px-4 md:px-0">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-wider drop-shadow-lg">
          Welcome to <span className="text-yellow-400">KnackX</span>
        </h1>
        <p className="text-white text-sm md:text-lg mt-2">
          Unlock your potential with us 🚀
        </p>
      </div>
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-md z-20 mt-20 md:mt-0">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 text-center mb-6">
          Log in to <span className="text-indigo-600">KnackX</span>
        </h2>
        {loadingMessage && (
          <div className="mb-4 text-yellow-500 text-center font-semibold">
            {loadingMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute bottom-10 text-center text-white animate-pulse z-10 px-4 md:px-0">
        <p>
          Experience the best with <span className="font-bold">KnackX</span>!
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
