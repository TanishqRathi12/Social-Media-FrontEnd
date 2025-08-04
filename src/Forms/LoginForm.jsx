import React, { useState, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Components/axios";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage("");
    setLoadingMessage("Logging in as guest...");

    try {
      const response = await axios.post("/login", {
        email: "guest123@gmail.com",
        password: "Guest@12",
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      login();
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setLoadingMessage("Guest login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Guest login error:", err);
      setErrorMessage(
        err.response?.data?.error || "Guest login failed. Please try again."
      );
      setLoadingMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading) return;

      setLoading(true);
      setErrorMessage("");
      setLoadingMessage("Request taking longer due to free hosting...");

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
        setLoadingMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(
          err.response?.data?.message ||
            "Invalid email or password. Please try again."
        );
        setLoadingMessage("");
      } finally {
        setLoading(false);
      }
    },
    [email, password, login, navigate, loading]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="hidden md:flex md:flex-1 bg-gradient-to-br from-blue-700 via-indigo-900 to-blue-900 items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-300 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Knack<span className="text-blue-400">X</span>
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed">
              Unlock your potential with our comprehensive learning platform
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 text-gray-200">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-200">
              <Zap className="w-5 h-5 text-blue-400" />
              <span>AI-powered learning paths</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-200">
              <ArrowRight className="w-5 h-5 text-blue-400" />
              <span>Personalized progress tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form section - Full width on mobile, half width on md and up */}
      <div className="flex-1 md:flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile header - Only visible on mobile */}
          <div className="md:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Knack<span className="text-blue-600">X</span>
            </h1>
            <p className="text-gray-600">
              Welcome back to your learning journey
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to continue your learning journey
              </p>
            </div>

            {loadingMessage && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  loadingMessage.includes("successful")
                    ? "bg-green-50 border-green-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                      loadingMessage.includes("successful")
                        ? "border-green-600"
                        : "border-blue-600"
                    }`}
                  ></div>
                  <span
                    className={`font-medium ${
                      loadingMessage.includes("successful")
                        ? "text-green-700"
                        : "text-blue-700"
                    }`}
                  >
                    {loadingMessage}
                  </span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full mt-2 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loadingMessage.includes("guest") ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login as Guest</span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  Create account
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
