"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // AUTO REDIRECT kalau sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChange = (key: "username" | "password", value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      setToken(data.token);

      router.replace("/dashboard");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e4f6b]/80">
      <div className="bg-gradient-to-b from-[#103145] via-[#2A82B7] to-[#103145] rounded-2xl p-8 w-[350px] shadow-xl">
        <h1 className="text-white text-xl font-bold text-center mb-6">
          MASOOOK!!!
        </h1>

        <div className="mb-4">
          <label className="text-white text-sm">Username</label>
          <input
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-full text-white bg-[#2A82B7] hover:shadow-[0_0_15px_rgba(56,189,248,0.8)] transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
