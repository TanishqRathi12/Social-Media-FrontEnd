import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../Components/axios";
import { jwtDecode } from "jwt-decode";
import Modal from "./Model";

const Navbar = ({ onMenuClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        try {
          const response = await axios.get(`/getUserById/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserImage(response.data.ProfilePicture);
          setUserName(response.data.name || response.data.username || "User");
          setUserEmail(response.data.email || "user@knackx.com");
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };
    fetchUserData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle sidebar"
          onClick={onMenuClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hamburger icon */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo + Site name */}
        <div className="flex items-center gap-3">
          <img
            src="/KnackX Logo.png"
            alt="KnackX Logo"
            className="h-10 w-10 hidden md:block rounded-full ring-2 ring-indigo-400"
          />
          <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            KnackX
          </span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            aria-haspopup="true"
            aria-expanded={showDropdown}
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <img
              src={userImage || "/default-profile.png"}
              alt="User Profile"
              className="h-10 w-10 rounded-full border border-indigo-400"
            />
            <div className="hidden sm:flex flex-col mr-2 text-right">
              <span className="text-sm font-medium text-white">{userName}</span>
              <span className="text-xs text-green-400">Online</span>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transform transition duration-200 ${
                showDropdown ? "rotate-180 text-indigo-400" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 max-w-[90vw] w-72 sm:w-80 rounded-xl bg-gray-800/95 border border-gray-800 shadow-xl z-50 animate-fade-in">
              <div className="flex items-center px-5 py-4 gap-4 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-t-xl">
                <img
                  src={userImage || "/default-profile.png"}
                  alt="User"
                  className="h-12 w-12 rounded-full border-2 border-indigo-300"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">{userName}</p>
                  <p className="text-xs text-gray-400">{userEmail}</p>
                  <div className="inline-flex items-center gap-1 text-xs text-green-400 mt-1">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Active now
                  </div>
                </div>
              </div>
              <div className="py-2 px-1 space-y-1">
                <NavLink label="Profile Settings" desc="Manage your account" color="indigo" />
                <NavLink label="Account Settings" desc="Privacy & security" color="purple" />
                <NavLink label="Billing & Plans" desc="Subscription management" color="blue" />
                <NavLink label="Help & Support" desc="Get assistance" color="emerald" />
                <div className="border-t border-gray-700 my-2" />
                <NavLink
                  label="Sign Out"
                  desc="End your session"
                  color="red"
                  handle={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Logout Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
          message1="Confirm Logout"
          message2="Are you sure you want to Logout?"
          button="Logout Anyway"
        />
      </div>
    </nav>
  );
};

const colorMap = {
  indigo: {
    hoverBg: "hover:bg-indigo-500/10",
    focusBg: "focus:bg-indigo-500/20",
    bg10: "bg-indigo-500/10",
    text400: "text-indigo-400",
  },
  purple: {
    hoverBg: "hover:bg-purple-500/10",
    focusBg: "focus:bg-purple-500/20",
    bg10: "bg-purple-500/10",
    text400: "text-purple-400",
  },
  blue: {
    hoverBg: "hover:bg-blue-500/10",
    focusBg: "focus:bg-blue-500/20",
    bg10: "bg-blue-500/10",
    text400: "text-blue-400",
  },
  emerald: {
    hoverBg: "hover:bg-emerald-500/10",
    focusBg: "focus:bg-emerald-500/20",
    bg10: "bg-emerald-500/10",
    text400: "text-emerald-400",
  },
  red: {
    hoverBg: "hover:bg-red-500/10",
    focusBg: "focus:bg-red-500/20",
    bg10: "bg-red-500/10",
    text400: "text-red-400",
  },
};

const NavLink = ({ label, desc, color = "indigo", handle }) => {
  const classes = colorMap[color] || colorMap.indigo;
  return (
    <li
      onClick={handle}
      className={`flex items-center cursor-pointer gap-3 px-4 py-2.5 rounded-lg group transition ${classes.hoverBg} ${classes.focusBg} outline-none`}
      tabIndex={0}
    >
      <span className={`w-9 h-9 flex items-center justify-center rounded-md ${classes.bg10}`}>
        <svg
          className={`w-5 h-5 ${classes.text400}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      </span>
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-gray-400">{desc}</div>
      </div>
    </li>
  );
};

export default Navbar;
