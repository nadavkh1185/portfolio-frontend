import { About, AboutApi } from "@/types/about";

export function mapAboutFromApi(data: AboutApi): About {
  return {
    subtitle: data.subtitle,
    paragraph1: data.paragraph1,
    paragraph2: data.paragraph2,
    paragraph3: data.paragraph3,
    image_url: data.image_url,
  };
}

export function mapAboutToApi(data: About): Omit<AboutApi, "ID" | "image_url"> {
  return {
    subtitle: data.subtitle,
    paragraph1: data.paragraph1,
    paragraph2: data.paragraph2,
    paragraph3: data.paragraph3,
  };
}
