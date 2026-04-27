"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

const navLinks = ["profile", "about", "skills", "projects"];
const ctaLinks = ["experience", "contact"];

type NavbarProps = {
  onNavigate: (section: string) => void;
};

export default function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("profile");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = [...navLinks, ...ctaLinks]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActive(visibleEntries[0].target.id);
        }
      },
      { threshold: [0.25, 0.4, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClass = useMemo(
    () =>
      `fixed top-0 left-0 z-50 w-full px-4 md:px-8 transition-all duration-300 ${
        scrolled
          ? "bg-[#07161f]/55 backdrop-blur-lg border-b border-cyan-200/40 shadow-[0_8px_28px_rgba(60,198,255,0.35)]"
          : "bg-transparent"
      }`,
    [scrolled]
  );

  const goTo = (section: string) => {
    setActive(section);
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <nav className={navClass}>
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between">
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => goTo(link)}
              className={`public-nav-item text-lg font-semibold capitalize text-white ${
                active === link ? "is-active" : ""
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-full border border-white/40 p-2 text-white transition hover:shadow-[0_0_14px_rgba(255,255,255,0.6)] md:hidden"
        >
          {mobileOpen ? <ChevronDown size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => goTo("experience")}
            className={`rounded-full border px-6 py-2 text-base font-medium text-white transition ${
              active === "experience"
                ? "border-white shadow-[0_0_18px_rgba(255,255,255,0.7)]"
                : "border-white/85 hover:shadow-[0_0_16px_rgba(255,255,255,0.65)]"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => goTo("contact")}
            className={`rounded-full border border-white px-6 py-2 text-base font-semibold text-[#07161f] transition ${
              active === "contact"
                ? "bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]"
                : "bg-white/95 hover:shadow-[0_0_16px_rgba(255,255,255,0.7)]"
            }`}
          >
            Contact
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-auto mb-3 max-w-xs rounded-2xl border border-cyan-200/40 bg-[#0b2431]/90 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => goTo(link)}
                className={`text-left text-base font-semibold capitalize text-white ${
                  active === link ? "underline underline-offset-4" : ""
                }`}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => goTo("experience")}
              className="mt-1 rounded-full border border-white px-4 py-2 text-sm font-semibold text-white"
            >
              Experience
            </button>
            <button
              onClick={() => goTo("contact")}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#07161f]"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
