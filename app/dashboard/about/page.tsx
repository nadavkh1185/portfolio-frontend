"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { About, AboutApi } from "@/types/about";
import { mapAboutFromApi } from "@/lib/adapters/about.adapter";
import { getImageUrl } from "@/lib/utils";

export default function AboutPage() {
  const [originalData, setOriginalData] = useState<About | null>(null);
  const [formData, setFormData] = useState<About>({
    subtitle: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/about`,
      );

      const data: AboutApi = await res!.json();

      const mapped = mapAboutFromApi(data);

      setOriginalData(mapped);
      setFormData(mapped);
    };

    fetchData();
  }, []);

  // HANDLE INPUT
  const handleChange = (key: keyof About, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // IMAGE CHANGE
  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  // RESET
  const handleReset = () => {
    setFormData({
      subtitle: "",
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
    });
    setImageFile(null);
  };

  // BATAL
  const handleCancel = () => {
    if (!originalData) return;
    setFormData(originalData);
    setImageFile(null);
  };

  // SAVE
  const handleSave = async () => {
    try {
      const form = new FormData();

      form.append("subtitle", formData.subtitle);
      form.append("paragraph1", formData.paragraph1);
      form.append("paragraph2", formData.paragraph2);
      form.append("paragraph3", formData.paragraph3);

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/about`,
        {
          method: "PUT",
          body: form,
        },
      );

      const data: AboutApi = await res!.json();
      const mapped = mapAboutFromApi(data);

      setOriginalData(mapped);
      setFormData(mapped);
      setImageFile(null);

      alert("Berhasil disimpan");
    } catch {
      alert("Gagal");
    }
  };

  return (
    <div className="bg-[#5797B1] rounded-2xl p-8 mt-10 w-full max-w-1xl max-h-[85vh] overflow-y-auto no-scrollbar">
      <h2 className="text-[#244051] font-bold text-lg mb-6">About</h2>

      {/* IMAGE */}
      <div className="mb-5">
        <label className="text-sm text-[#18364A] mb-2 block">Image</label>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200">
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                className="w-full h-full object-cover"
              />
            ) : (
              formData.image_url && (
                <img
                  src={getImageUrl(formData.image_url)}
                  className="w-full h-full object-cover"
                />
              )
            )}
          </div>

          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImageFile(e.target.files[0]);
              }
            }}
            className="text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="text-sm text-[#18364A] mb-1 block">Subtitle</label>
          <input
            value={formData.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg bg-gray-200 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm text-[#18364A] mb-1 block">
            Paragraph 1
          </label>
          <textarea
            value={formData.paragraph1}
            onChange={(e) => handleChange("paragraph1", e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg bg-gray-200 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm text-[#18364A] mb-1 block">
            Paragraph 2
          </label>
          <textarea
            value={formData.paragraph2}
            onChange={(e) => handleChange("paragraph2", e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg bg-gray-200 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm text-[#18364A] mb-1 block">
            Paragraph 3
          </label>
          <textarea
            value={formData.paragraph3}
            onChange={(e) => handleChange("paragraph3", e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg bg-gray-200 outline-none
          focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleCancel}
          className="px-4 py-1.5 rounded-lg bg-yellow-400
        hover:shadow-[0_0_10px_rgba(250,204,21,0.8)]"
        >
          Batal
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-1.5 rounded-lg bg-red-500 text-white
        hover:shadow-[0_0_12px_rgba(239,68,68,0.8)]"
        >
          Reset
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 rounded-lg bg-[#2A82B7] text-white
        hover:shadow-[0_0_12px_rgba(56,189,248,0.8)]"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
