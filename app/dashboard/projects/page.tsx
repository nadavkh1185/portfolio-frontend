"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Projects, ProjectsApi } from "@/types/project";
import { mapProjectsFromApi } from "@/lib/adapters/project.adapter";
import { getImageUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`,
      );

      const data: ProjectsApi[] = await res!.json();
      setProjects(data.map(mapProjectsFromApi));
    };

    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus project ini?")) return;

    await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`,
      {
        method: "DELETE",
      },
    );

    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-8 mt-10 w-full max-w-1xl max-h-[85vh] overflow-y-auto no-scrollbar">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl font-semibold">Projects</h1>

        <button
          onClick={() => router.push("/dashboard/projects/new")}
          className="bg-[#2A82B7] px-5 py-2 rounded-lg text-white
          hover:shadow-[0_0_15px_rgba(56,189,248,0.8)] transition"
        >
          Tambah
        </button>
      </div>

      {/* CARD LIST (SCROLL HORIZONTAL) */}
      <div className="overflow-y-auto no-scrollbar">
        <div className="flex gap-5 w-max">
          {projects.map((item) => (
            <div
              key={item.id}
              className="bg-[#5f8ea3] w-[160px] p-4 rounded-2xl text-center"
            >
              <img
                src={getImageUrl(item.image_url)}
                className="w-16 h-16 mx-auto object-contain"
              />

              <p className="mt-2 text-white">{item.subtitle}</p>

              <div className="flex justify-center gap-2 mt-3">
                <button
                  onClick={() => router.push(`/dashboard/projects/${item.id}`)}
                  className="bg-yellow-400 p-2 rounded
                  hover:shadow-[0_0_10px_rgba(250,204,21,0.9)]"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 p-2 rounded text-white
                  hover:shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
