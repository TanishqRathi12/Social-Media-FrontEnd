import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Model";

export const Sidebar = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/Profile", label: "Profile" },
    { to: "/Explore", label: "Explore" },
  ];

  return (
    <div>

      <button
        onClick={handleToggle}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className="hidden mt-12 sm:flex flex-col w-64 min-h-screen fixed bg-gray-900 shadow-md">
        <nav className="flex-grow py-6 px-4">
          <ul className="space-y-4">
            {navItems.map(({ to, label }) => (
              <li key={to} className="text-lg font-semibold">
                <Link
                  to={to}
                  className="block p-4 rounded-md text-white hover:bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="text-lg font-semibold">
              <button
                onClick={()=>setIsModalOpen(true)}
                className="block w-full p-4 rounded-md bg-red-600 text-white hover:bg-red-700 border border-red-700 text-left transition-all duration-200"
              >
                Logout
              </button>
              <Modal
              isOpen={isModalOpen}
              onClose={()=>setIsModalOpen(false)}
              onConfirm={handleLogout}
              message1={"Confirm Logout"}
              message2={"Are you sure you want to Logout?"}
              />
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={`fixed z-10 p-7 top-0 left-0 w-64 h-full bg-gray-900 shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <nav className="flex-grow py-6 px-4">
          <ul className="space-y-4">
            {navItems.map(({ to, label }) => (
              <li key={to} className="text-lg font-semibold">
                <Link
                  to={to}
                  onClick={handleToggle}
                  className="block p-4 rounded-md text-white hover:bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="text-lg font-semibold">
              <button
                onClick={()=>setIsModalOpen(true)}
                className="block w-full p-4 rounded-md bg-red-700 text-white hover:bg-red-700 border border-red-800 text-left transition-all duration-200"
              >
                Logout
              </button>
              <Modal
              isOpen={isModalOpen}
              onClose={()=>setIsModalOpen(false)}
              onConfirm={handleLogout}
              message1={"Confirm Logout"}
              message2={"Are you sure you want to Logout?"}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
