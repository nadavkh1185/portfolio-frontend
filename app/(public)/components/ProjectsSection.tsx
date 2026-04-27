"use client";

import { useEffect, useRef, useState } from "react";
import type { Projects } from "@/types/project";
import Reveal from "./Reveal";

type Props = {
  data: Projects[];
};

export default function ProjectsSection({ data }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = [
        ...el.querySelectorAll("[data-project-card]"),
      ] as HTMLDivElement[];
      if (cards.length === 0) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });

      setActiveIndex(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [data.length]);

  return (
    <section className="public-section overflow-hidden px-0 md:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <h2 className="public-title pt-20 text-white">Projects Section</h2>
        </Reveal>
      </div>

      <Reveal className="mt-8 md:mt-10" delayMs={120}>
        <div
          ref={listRef}
          className="no-scrollbar flex snap-x snap-mandatory items-end gap-7 overflow-x-auto overflow-y-visible px-0 pb-8 pt-10 md:gap-16 md:pb-10 md:pt-14"
        >
          <div
            aria-hidden="true"
            className="shrink-0 w-[max(0px,calc(50vw-10.5rem))] md:w-[max(0px,calc(50vw-14.5rem))]"
          />

          {data.map((project, index) => (
            <article
              key={project.id}
              data-project-card
              onClick={(event) => {
                event.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
                setActiveIndex(index);
              }}
              className={`relative shrink-0 snap-center cursor-pointer overflow-visible rounded-[1.65rem] border border-cyan-100/20 bg-[linear-gradient(180deg,rgba(118,205,241,0.52)_0%,rgba(76,162,198,0.9)_100%)] p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeIndex === index
                  ? "w-[74vw] -translate-y-3 scale-[1.01] opacity-100 shadow-[0_18px_34px_rgba(0,0,0,0.18)] md:w-[430px] md:-translate-y-8 md:scale-[1.03]"
                  : "w-[65vw] translate-y-0 scale-[0.96] opacity-92 shadow-[0_12px_24px_rgba(0,0,0,0.12)] md:w-[300px] md:scale-100"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-[48%] -z-10 h-[64%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-[rgba(149,236,255,0.62)] opacity-100 blur-[34px]"
                    : "bg-[rgba(149,236,255,0.18)] opacity-65 blur-[20px]"
                }`}
              />

              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${project.image_url}`}
                alt={project.subtitle}
                className={`w-full rounded-[1.2rem] object-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-500 ${
                  activeIndex === index
                    ? "h-[188px] md:h-[218px]"
                    : "h-[160px] md:h-[176px]"
                }`}
              />

              <p
                className={`mt-4 line-clamp-2 text-center font-semibold leading-tight text-[#0b2231] transition-all duration-500 ${
                  activeIndex === index
                    ? "text-[0.98rem] md:text-[1.05rem]"
                    : "text-[0.92rem] md:text-[0.92rem]"
                }`}
              >
                {project.subtitle}
              </p>
            </article>
          ))}

          <div
            aria-hidden="true"
            className="shrink-0 w-[max(0px,calc(50vw-10.5rem))] md:w-[max(0px,calc(50vw-14.5rem))]"
          />
        </div>
      </Reveal>

      <div className="mt-5 pb-8 flex items-center justify-center gap-4 rounded-full md:pb-10">
        {data.map((project, index) => (
          <span
            key={`dot-${project.id}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeIndex
                ? "bg-cyan-200 shadow-[0_0_12px_rgba(156,236,255,1)]"
                : "bg-white/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
