import { ProfileApi, Profile } from "@/types/profile";

export function mapProfileFromApi(data: ProfileApi): Profile {
  return {
    name: data.Name,
    career: data.Career,
    headline: data.Headline,
    line: data.Line,
  };
}

export function mapProfileToApi(data: Profile): Omit<ProfileApi, "ID"> {
  return {
    Name: data.name,
    Career: data.career,
    Headline: data.headline,
    Line: data.line,
  };
}
