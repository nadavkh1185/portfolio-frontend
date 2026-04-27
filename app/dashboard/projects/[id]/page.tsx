"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { mapProjectsFromApi } from "@/lib/adapters/project.adapter";
import { ProjectsApi } from "@/types/project";
import { getImageUrl } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

export default function EditProjectsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`,
      );

      const data: ProjectsApi = await res!.json();
      const mapped = mapProjectsFromApi(data);

      setSubtitle(mapped.subtitle);
      setImageUrl(mapped.image_url);
    };

    load();
  }, [id]);

  const handleSubmit = async () => {
    if (!subtitle.trim()) return alert("Subtitle wajib");

    const form = new FormData();
    form.append("subtitle", subtitle);

    if (file) form.append("image", file);

    await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`,
      {
        method: "PUT",
        body: form,
      },
    );

    router.push("/dashboard/projects");
  };

  return (
    <div className="mt-10">
      <div className="bg-[#5797B1] rounded-2xl p-8 w-[600px]">
        <h2 className="text-[#244051] font-bold mb-6">Edit Project</h2>

        {/* IMAGE */}
        <label className="block mb-2">Image</label>

        <div className="mb-3">
          {file ? (
            <img src={URL.createObjectURL(file)} className="w-20" />
          ) : (
            imageUrl && <img src={getImageUrl(imageUrl)} className="w-20" />
          )}
        </div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* TITLE */}
        <label className="block mt-4 mb-2">Subtitle</label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-4 py-2 text-black rounded-lg bg-gray-200"
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
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
