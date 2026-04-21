"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Profile, ProfileApi } from "@/types/profile";
import {
  mapProfileFromApi,
  mapProfileToApi,
} from "@/lib/adapters/profile.adapter";

export default function ProfilePage() {
  const [originalData, setOriginalData] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Profile>({
    name: "",
    career: "",
    headline: "",
    line: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
      );

      const data: ProfileApi = await res!.json();
      const mapped = mapProfileFromApi(data);
      setOriginalData(mapped);
      setFormData(mapped);
    };

    fetchData();
  }, []);

  const handleChange = (key: keyof Profile, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      career: "",
      headline: "",
      line: "",
    });
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        {
          method: "PUT",
          body: JSON.stringify(mapProfileToApi(formData)),
        },
      );

      if (!res?.ok) throw new Error("Gagal update");

      const updated: ProfileApi = await res.json();
      const mapped = mapProfileFromApi(updated);
      setOriginalData(mapped);
      setFormData(mapped);

      alert("Berhasil disimpan");
    } catch (err) {
      alert("Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#5797B1] rounded-2xl p-8 mt-10 w-full max-w-1xl max-h-[100vh] overflow-y-auto no-scrollbar">
      <h2 className="text-[#244051] font-bold text-lg mb-6">Profile</h2>

      <div className="flex flex-col gap-5">
        {/* NAME */}
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Name</label>
          <input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* CAREER */}
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Career</label>
          <input
            value={formData.career}
            onChange={(e) => handleChange("career", e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* HEADLINE */}
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Headline</label>
          <input
            value={formData.headline}
            onChange={(e) => handleChange("headline", e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* LINE */}
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Line</label>
          <input
            value={formData.line}
            onChange={(e) => handleChange("line", e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleCancel}
          className="px-4 py-1.5 rounded-lg bg-yellow-400 text-black text-sm
        hover:shadow-[0_0_10px_rgba(250,204,21,0.8)] transition"
        >
          Batal
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm
        hover:shadow-[0_0_12px_rgba(239,68,68,0.8)] transition"
        >
          Reset
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 rounded-lg bg-[#2A82B7] text-white text-sm
        hover:shadow-[0_0_12px_rgba(56,189,248,0.8)] transition"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
