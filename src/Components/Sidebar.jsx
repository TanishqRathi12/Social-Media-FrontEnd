import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
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
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

  
      <div className="hidden mt-12 sm:flex flex-col w-64 min-h-screen fixed bg-gray-900 shadow-md">
        <nav className="flex-grow py-6 px-4">
          <ul className="space-y-4">
            {navItems.map(({ to, label }) => (
              <Link key={to} to={to}>
                <li className="text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700 hover:text-blue-400 transition-colors">
                  {label}
                </li>
              </Link>
            ))}
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
              <Link key={to} to={to} onClick={handleToggle}>
                <li className="text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700 hover:text-blue-400 transition-colors">
                  {label}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
