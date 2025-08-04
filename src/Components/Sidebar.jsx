import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaHome, FaCompass } from "react-icons/fa";

const navConfig = [
  { to: "/", label: "Home", Icon: FaHome },
  { to: "/Profile", label: "Profile", Icon: FaUser },
  { to: "/Explore", label: "Explore", Icon: FaCompass },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();


  useEffect(() => {
    onClose();
  }, [location.pathname]);

  
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 z- bg-gray-900/90 shadow-2xl border-r border-gray-800/40 backdrop-blur-xl">
        <div className="md:hidden flex items-center gap-3 p-7 pb-2">
          <img
            src="/KnackX Logo.png"
            alt="Logo"
            className="w-10 h-10 object-cover rounded-full ring-2 ring-indigo-400/60"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            KnackX
          </span>
        </div>
        <nav className="flex-grow px-3 md:pt-20 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navConfig.map(({ to, label, Icon }) => (
              <li key={to}>
                <SidebarNavLink
                  to={to}
                  label={label}
                  Icon={Icon}
                  active={location.pathname === to}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar drawer */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-56 max-w-[90vw] h-full flex flex-col bg-gray-900/95 border-r border-gray-800/50 shadow-2xl backdrop-blur-xl transform transition-transform duration-300 sm:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="navigation"
        aria-label="Sidebar"
      >
        <div className="flex items-center gap-3 p-7 pb-2">
          <img
            src="/KnackX Logo.png"
            alt="Logo"
            className="w-10 h-10 object-cover rounded-full ring-2 ring-indigo-400/60"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            KnackX
          </span>
        </div>
        <nav className="flex-grow px-3 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navConfig.map(({ to, label, Icon }) => (
              <li key={to}>
                <SidebarNavLink
                  to={to}
                  label={label}
                  Icon={Icon}
                  active={location.pathname === to}
                  onClick={onClose}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

function SidebarNavLink({ to, label, Icon, active, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-4 px-5 py-3 rounded-xl font-semibold transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white shadow-lg"
            : "text-gray-200 hover:text-white hover:bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-blue-700/30"
        }
        outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
      tabIndex={0}
    >
      <Icon className="text-lg text-indigo-400" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

export default Sidebar;
