"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { mapExperienceFromApi } from "@/lib/adapters/experience.adapter";
import { ExperienceApi } from "@/types/experience";
import { useParams, useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience/${id}`,
      );
      const json: ExperienceApi = await res!.json();
      const mapped = mapExperienceFromApi(json);

      setTitle(mapped.title);
      setHtml(mapped.paragraph);
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Title wajib");

    await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          paragraph: html,
        }),
      },
    );

    router.push("/dashboard/experience");
  };

  return (
    <div className="mt-10">
      <div className="bg-[#5797B1] rounded-2xl p-8 w-[700px]">
        <h2 className="font-bold text-[#244051] mb-6">Edit Experience</h2>

        <label className="block mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-200"
        />

        <label className="block mt-4 mb-2">Paragraph</label>
        <RichTextEditor value={html} onChange={setHtml} />

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
