export type Experience = {
  id: number;
  title: string;
  paragraph: string; // HTML string (dari editor)
};

export type ExperienceApi = {
  ID: number;
  Title: string;
  Paragraph: string; // backend kirim JSON string yg berisi HTML, atau langsung HTML
};