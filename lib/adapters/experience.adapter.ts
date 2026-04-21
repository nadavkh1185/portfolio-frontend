import { Experience, ExperienceApi } from "@/types/experience";

function extractHtml(input: string): string {
  // jika backend simpan JSON string: { html: "<p>...</p>" }
  try {
    const parsed = JSON.parse(input);
    if (parsed?.html) return parsed.html as string;
  } catch {}
  // kalau bukan JSON, anggap sudah HTML
  return input ?? "";
}

export function mapExperienceFromApi(data: ExperienceApi): Experience {
  return {
    id: data.ID,
    title: data.Title ?? "",
    paragraph: extractHtml(data.Paragraph ?? ""),
  };
}
