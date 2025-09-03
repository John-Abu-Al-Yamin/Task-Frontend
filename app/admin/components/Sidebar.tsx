"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Pocket,
  Tag,
  X,
  LogOut,
  Settings,
  ChevronRight,
  Shield,
  Activity,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Zones", href: "/admin/zones", icon: Pocket },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Rush Hours", href: "/admin/rush-hours", icon: Calendar },
  { name: "Vacations", href: "/admin/vacations", icon: Calendar },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: Shield },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-all duration-300 ease-out w-72 bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] text-gray-100 flex flex-col z-40 border-r border-[#29382f]/50`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between h-20 px-6 border-b border-[#29382f]/50 bg-[#0a0f0c]/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#38e07b] to-[#2dd968] rounded-xl flex items-center justify-center shadow-lg shadow-[#38e07b]/25">
              <Activity className="w-6 h-6 text-[#0a0f0c] font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#38e07b] to-[#2dd968] bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-[#9eb7a8]">Parking Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-[#9eb7a8] hover:text-[#38e07b] hover:bg-[#38e07b]/10 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#38e07b] to-transparent" />
        </div>

        {/* Admin Info Card */}
        {/* <div className="mx-4 mt-6 mb-4 p-4 bg-[#0f1611]/60 backdrop-blur-sm border border-[#29382f]/50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#38e07b]/20 to-[#2dd968]/20 rounded-full flex items-center justify-center border border-[#38e07b]/30">
              <Settings className="w-6 h-6 text-[#38e07b]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Administrator
              </p>
              <p className="text-xs text-[#9eb7a8] truncate">System Manager</p>
            </div>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-none">
          {/* <div className="text-xs font-semibold text-[#9eb7a8] uppercase tracking-wider mb-3 px-3">
            Navigation
          </div> */}
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`group relative flex items-center p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#38e07b]/20 to-[#2dd968]/10 border border-[#38e07b]/30 text-[#38e07b] shadow-lg shadow-[#38e07b]/10"
                    : "text-[#9eb7a8] hover:bg-[#0f1611]/60 hover:text-[#38e07b] hover:border-[#29382f]/50 border border-transparent"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#38e07b] to-[#2dd968] rounded-r-full" />
                )}

                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[#38e07b]/20 shadow-lg shadow-[#38e07b]/20"
                      : "bg-[#0f1611]/50 group-hover:bg-[#38e07b]/10"
                  }`}
                >
                  <link.icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-[#38e07b]"
                        : "text-[#9eb7a8] group-hover:text-[#38e07b]"
                    }`}
                  />
                </div>

                <div className="flex-1 ml-3 min-w-0">
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isActive ? "text-[#38e07b]" : "group-hover:text-[#38e07b]"
                    }`}
                  >
                    {link.name}
                  </span>
                </div>

                {/* Arrow indicator */}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    isActive
                      ? "text-[#38e07b] transform translate-x-1"
                      : "text-transparent group-hover:text-[#9eb7a8] group-hover:transform group-hover:translate-x-1"
                  }`}
                />

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#38e07b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-[#29382f]/50 bg-[#0a0f0c]/60 backdrop-blur-sm">
          <button className="group flex items-center w-full p-3 text-[#9eb7a8] rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 border border-transparent transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0f1611]/50 group-hover:bg-red-500/10 transition-all duration-300">
              <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors duration-300" />
            </div>
            <span className="ml-3 font-medium group-hover:text-red-400 transition-colors duration-300">
              Logout
            </span>
            <ChevronRight className="w-4 h-4 ml-auto text-transparent group-hover:text-red-400 group-hover:transform group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </div>

        {/* Decorative bottom gradient */}
        <div className="h-2 bg-gradient-to-r from-[#38e07b]/20 via-[#2dd968]/30 to-[#38e07b]/20" />
      </aside>
    </>
  );
};

export default Sidebar;
