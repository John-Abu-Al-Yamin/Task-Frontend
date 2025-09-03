"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Menu, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      // لو مفيش تسجيل دخول → يروح على login
      if (!token || !userStr) {
        router.replace("/login");
        return;
      }

      const user = JSON.parse(userStr);

      // لو role مش admin → يروح على checkpoint
      if (user.role !== "admin") {
        router.replace("/checkpoint");
        return;
      }

      // لو admin → يسمح له
      setIsAuthorized(true);
    } catch (err) {
      console.error("Auth check failed", err);
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#38e07b]" />
      </div>
    );
  }

  if (!isAuthorized) return null;

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
