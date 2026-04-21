import { Projects, ProjectsApi } from "@/types/project";

export function mapProjectsFromApi(data: ProjectsApi): Projects {
  return {
    id: data.ID,
    image_url: data.ImageURL,
    subtitle: data.Subtitle,
  };
}
