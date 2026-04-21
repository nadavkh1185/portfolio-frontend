export type AboutApi = {
  ID: number;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image_url: string;
};

export type About = {
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image_url?: string;
};
