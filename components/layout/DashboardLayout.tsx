"use client";

import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
