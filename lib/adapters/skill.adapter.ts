import { Skill, SkillApi } from "@/types/skill";

export function mapSkillFromApi(data: SkillApi): Skill {
  return {
    id: data.ID,
    image_url: data.image_url,
    image_title: data.image_title,
  };
}
