import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function CommonComp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar on mobile
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Overlay behind sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main section */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default CommonComp;
