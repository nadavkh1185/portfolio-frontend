"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { removeToken } from "@/lib/auth";
import {
  LayoutDashboard,
  User,
  Info,
  Wrench,
  Folder,
  Briefcase,
  Mail,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const menus = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "About", href: "/dashboard/about", icon: Info },
  { name: "Skills", href: "/dashboard/skills", icon: Wrench },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
  { name: "Contact", href: "/dashboard/contact", icon: Mail },
];

const handleLogout = () => {
  const confirmLogout = confirm("Yakin ingin logout?");
  if (!confirmLogout) return;

  removeToken();
  window.location.href = "/login";
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`relative transition-all duration-300 ${
        collapsed ? "w-28" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div className="text-[#9DD0EF] font-bold text-lg px-4 py-4">
        PORTFOLIO VINA
      </div>

      {/* CARD SIDEBAR */}
      <div className="px-3 relative">
        <div className="bg-gradient-to-b from-[#103145] via-[#2A82B7] to-[#103145] rounded-2xl p-3 min-h-[80vh] flex flex-col gap-2 ring-1 ring-[#1e4f6b]">
          {/* MENU LABEL (TIDAK HILANG) */}
          <p className="text-white text-sm px-2 mb-2">Menu</p>

          {/* NAV */}
          <nav className="flex flex-col gap-2 h-[80vh] overflow-y-auto p-2">
            {menus.map((menu) => {
              const isActive = pathname === menu.href;
              const Icon = menu.icon;

              return (
                <Link
                  key={menu.name}
                  href={menu.href}
                  className={`
                    nav-item group flex items-center text-white text-sm p-2 rounded-lg
                    ${collapsed ? "justify-center p-3" : "gap-3 px-4 py-2"}
                    ${isActive ? "nav-active" : ""}
                  `}
                >
                  <Icon size={18} />

                  {!collapsed && menu.name}
                </Link>
              );
            })}
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="
      flex items-center gap-3 px-4 py-3 rounded-lg
      text-red-400 hover:text-red-300
      hover:bg-red-500/10
      transition-all w-full
      hover:shadow-[0_0_10px_rgba(239,68,68,0.7)]
    "
              >
                <LogOut size={20} />

                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute top-[80%] right-0 translate-x-1/2
            bg-[#9DD0EF] text-[#18364A]
            rounded-full p-2 right-[10px]
            shadow-md
            transition-all
            hover:shadow-[0_0_10px_rgba(56,189,248,0.8)]
          "
        >
          <ChevronLeft
            size={16}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
