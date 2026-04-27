import { ProfileApi, Profile } from "@/types/profile";

export function mapProfileFromApi(data: ProfileApi): Profile {
  return {
    name: data.Name ?? data.name ?? "",
    career: data.Career ?? data.career ?? "",
    headline: data.Headline ?? data.headline ?? "",
    line: data.Line ?? data.line ?? "",
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
