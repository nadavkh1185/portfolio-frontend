import { ContactApi, Contact } from "@/types/contact";

export function mapContactFromApi(data: ContactApi): Contact {
  return {
    linkedin_link: data.LinkedinLink,
    instagram_link: data.InstagramLink,
  };
}

export function mapContactToApi(data: Contact): Omit<ContactApi, "ID"> {
  return {
    LinkedinLink: data.linkedin_link,
    InstagramLink: data.instagram_link,
  };
}
