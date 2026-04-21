"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Experience, ExperienceApi } from "@/types/experience";
import { mapExperienceFromApi } from "@/lib/adapters/experience.adapter";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function ExperiencePage() {
  const [data, setData] = useState<Experience[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`,
      );
      const json: ExperienceApi[] = await res!.json();
      setData(json.map(mapExperienceFromApi));
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus experience?")) return;

    await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience/${id}`,
      { method: "DELETE" },
    );

    setData((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="mt-10">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl font-semibold">Experiences</h1>

        <button
          onClick={() => router.push("/dashboard/experience/new")}
          className="bg-[#2A82B7] px-5 py-2 rounded-lg text-white
          hover:shadow-[0_0_15px_rgba(56,189,248,0.8)]"
        >
          Tambah
        </button>
      </div>

      {/* table */}
      <div className="bg-[#5797B1] rounded-2xl p-4">
        <table className="w-full text-sm">
          <thead className="text-[#18364A]">
            <tr>
              <th className="text-left py-2">Title</th>
              <th className="text-right py-2">Activity</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-[#4b7f96]">
                <td className="py-3 text-white">{item.title}</td>

                <td className="py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/experience/${item.id}`)
                      }
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
