import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button onClick={handleToggle}>
          {isOpen ? (
            <FaTimes className="text-white" size={24} />
          ) : (
            <FaBars className="text-white" size={24} />
          )}
        </button>
      </div>
      <div className="hidden sm:flex flex-col w-24 sm:w-64 min-h-screen fixed bg-gray-600 mt-16">
        <nav className="flex-grow">
          <ul className="space-y-2">
            <Link to="/">
              <li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                Home
              </li>
            </Link>
            <Link to="/Profile">
              <li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                Profile
              </li>
            </Link>
            <Link to="/Explore">
              <li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                Explore
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 w-40 h-full bg-gray-600 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <nav className="flex-grow pt-8">
          <ul className="space-y-2">
            <Link to="/" onClick={handleToggle}>
              <li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                Home
              </li>
            </Link>
            <Link to="/Profile" onClick={handleToggle}>
              <li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                Profile
              </li>
            </Link>
            <Link to="/Explore" onClick={handleToggle}>
              <li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                Explore
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
