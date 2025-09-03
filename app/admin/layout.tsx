"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#0a0f0c] border-b border-[#29382f]/50">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-[#9eb7a8] hover:text-[#38e07b] hover:bg-[#38e07b]/10 transition-all duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold text-lg">Admin Panel</h1>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-6 bg-[#0f1611] text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
