"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  useAuthGuard();

  return <DashboardLayout>{children}</DashboardLayout>;
}
