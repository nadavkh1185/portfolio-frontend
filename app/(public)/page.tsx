"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import SectionDivider from "./components/SectionDivider";

import { mapSkillFromApi } from "@/lib/adapters/skill.adapter";
import { mapProjectsFromApi } from "@/lib/adapters/project.adapter";
import { mapExperienceFromApi } from "@/lib/adapters/experience.adapter";
import { mapProfileFromApi } from "@/lib/adapters/profile.adapter";
import { mapContactFromApi } from "@/lib/adapters/contact.adapter";

import type { PublicData } from "@/types/public";
import type { ProfileApi } from "@/types/profile";
import type { About } from "@/types/about";
import type { Skill, SkillApi } from "@/types/skill";
import type { Projects, ProjectsApi } from "@/types/project";
import type { Contact } from "@/types/contact";
import type { ExperienceApi } from "@/types/experience";

export default function PublicPage() {
  const [data, setData] = useState<PublicData | null>(null);

  // 🔹 NAVIGATION HANDLER
  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // 🔹 FETCH DATA
  useEffect(() => {
    const load = async () => {
      const [profileRes, aboutRes, skillsRes, projectsRes, expRes, contactRes] =
        await Promise.all([
          apiFetch("/api/profile"),
          apiFetch("/api/about"),
          apiFetch("/api/skills"),
          apiFetch("/api/projects"),
          apiFetch("/api/experience"),
          apiFetch("/api/contact"),
        ]);

      if (
        !profileRes ||
        !aboutRes ||
        !skillsRes ||
        !projectsRes ||
        !expRes ||
        !contactRes
      )
        return;

      const profileRaw: ProfileApi = await profileRes.json();
      const profile = mapProfileFromApi(profileRaw);
      const about: About = await aboutRes.json();

      const skillsRaw: SkillApi[] = await skillsRes.json();
      const projectsRaw: ProjectsApi[] = await projectsRes.json();
      const expRaw: ExperienceApi[] = await expRes.json();
      const experience = expRaw.map(mapExperienceFromApi);
      const contactRaw = await contactRes.json();
      const contact: Contact = mapContactFromApi(
        Array.isArray(contactRaw) ? contactRaw[0] : contactRaw,
      );

      const skills: Skill[] = skillsRaw.map(mapSkillFromApi);
      const projects: Projects[] = projectsRaw.map(mapProjectsFromApi);

      setData({
        profile,
        about,
        skills,
        projects,
        experience,
        contact,
      });
    };

    load();
  }, []);

  // 🔹 LOADING STATE
  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="public-main">
      {/* NAVBAR */}
      <Navbar onNavigate={handleNavigate} />

      {/* PROFILE */}
      <section id="profile">
        <HeroSection data={data.profile} />
      </section>
      <SectionDivider text={data.profile.line} />

      {/* ABOUT */}
      <section id="about">
        <AboutSection data={data.about} />
      </section>
      <SectionDivider text={data.profile.line} />

      {/* SKILLS */}
      <section id="skills">
        <SkillsSection data={data.skills} />
      </section>
      <SectionDivider text={data.profile.line} />

      {/* PROJECTS */}
      <section id="projects">
        <ProjectsSection data={data.projects} />
      </section>
      <SectionDivider text={data.profile.line} />

      {/* EXPERIENCE */}
      <section id="experience">
        <ExperienceSection data={data.experience} />
      </section>
      <SectionDivider text={data.profile.line} />

      {/* CONTACT */}
      <section id="contact">
        <ContactSection data={data.contact} />
      </section>
      <SectionDivider text={data.profile.line} />
    </div>
  );
}
