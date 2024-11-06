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
        setErrorMessage(
          "Failed to create account. Please check your details and try again."
        );
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
    <>
      <h3 className="bg-red-100 border-l-4 border-red-500 text-red-700 ml-10 mr-10 mb-0 pb-0 rounded-lg shadow-md">
        🌼 Hey there! Just a heads up: Please keep your comments and posts
        respectful and positive—no abusive language here! If you have any
        concerns or issues, feel free to reach out to me directly instead of
        hiding behind anonymity. Let's keep it nice and constructive! 💖
      </h3>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          className="w-full max-w-sm bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-900">
            Sign Up
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-800 font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
