"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/types/profile";

type Props = {
  data: Profile;
};

export default function HeroSection({ data }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationCycle((prev) => prev + 1);
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(13, 39, 54, 0.55), rgba(7, 22, 31, 0.61)), url('/bg-tech3.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,130,183,0.16)_0%,rgba(7,22,31,0.82)_72%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <h2
          key={`hero-name-${animationCycle}`}
          className="hero-pop-in hero-pop-delay-1 hero-name-gloss text-4xl font-bold uppercase tracking-wide md:text-6xl"
        >
          {data.name}
        </h2>
        <h1
          key={`hero-career-${animationCycle}`}
          className="hero-pop-in hero-pop-delay-1 mt-2 max-w-4xl text-4xl font-bold uppercase md:text-7xl relative"
        >
          <span className="relative z-10 text-white">{data.career}</span>

          <span className="hero-polkadot-overlay absolute inset-0 z-20 pointer-events-none">
            {data.career}
          </span>
        </h1>
        <p
          key={`hero-headline-${animationCycle}`}
          className="hero-pop-in hero-pop-delay-2 mt-4 max-w-2xl text-sm text-white/95 md:text-2xl"
        >
          {data.headline}
        </p>
      </div>
    </section>
  );
}
