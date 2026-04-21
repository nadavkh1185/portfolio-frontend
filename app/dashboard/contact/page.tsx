"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Contact, ContactApi } from "@/types/contact";
import {
  mapContactFromApi,
  mapContactToApi,
} from "@/lib/adapters/contact.adapter";

export default function ContactPage() {
  const [originalData, setOriginalData] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<Contact>({
    linkedin_link: "",
    instagram_link: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`,
      );

      const data: ContactApi = await res!.json();
      const mapped = mapContactFromApi(data);
      setOriginalData(mapped);
      setFormData(mapped);
    };

    fetchData();
  }, []);

  const handleChange = (key: keyof Contact, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      linkedin_link: "",
      instagram_link: "",
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`,
        {
          method: "PUT",
          body: JSON.stringify(mapContactToApi(formData)),
        },
      );

      if (!res?.ok) throw new Error("Gagal update");

      const updated: ContactApi = await res.json();
      const mapped = mapContactFromApi(updated);
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
      <h2 className="text-[#244051] font-bold text-lg mb-6">Contact</h2>

      <div className="flex flex-col gap-5">
        {/* LINKEDIN */}
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Linkedin</label>
          <input
            value={formData.linkedin_link}
            onChange={(e) => handleChange("linkedin_link", e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* INSTAGRAM */}
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Instagram</label>
          <input
            value={formData.instagram_link}
            onChange={(e) => handleChange("instagram_link", e.target.value)}
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
