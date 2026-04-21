"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewProjectsPage() {
  const router = useRouter();

  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!subtitle.trim()) return alert("Subtitle wajib");
    if (!file) return alert("Image wajib");

    const form = new FormData();
    form.append("subtitle", subtitle);
    form.append("image", file);

    await apiFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
      method: "POST",
      body: form,
    });

    router.push("/dashboard/projects");
  };

  return (
    <div className="mt-10">
      <div className="bg-[#5797B1] rounded-2xl p-8 w-[600px]">
        <h2 className="text-[#244051] font-bold mb-6">Add Project</h2>

        {/* IMAGE */}
        <label className="block mb-2">Image</label>

        {file && <img src={URL.createObjectURL(file)} className="w-20 mb-3" />}

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* TITLE */}
        <label className="block mt-4 mb-2">Subtitle</label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-200"
        />

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => router.back()}
            className="bg-yellow-400 px-4 py-2 rounded
            hover:shadow-[0_0_10px_rgba(250,204,21,0.9)]"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#2A82B7] px-4 py-2 text-white rounded
            hover:shadow-[0_0_15px_rgba(56,189,248,0.8)]"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
