import { Profile } from "./profile";
import { About } from "./about";
import { Skill } from "./skill";
import { Projects } from "./project";
import { Experience } from "./experience";
import { Contact } from "./contact";

export type PublicData = {
  profile: Profile;
  about: About;
  skills: Skill[];
  projects: Projects[];
  experience: Experience[];
  contact: Contact;
};


