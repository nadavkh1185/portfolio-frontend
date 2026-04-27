"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Experience } from "@/types/experience";
import Reveal from "./Reveal";

type Props = {
  data: Experience[];
};

export default function ExperienceSection({ data }: Props) {
  const [open, setOpen] = useState<number | null>(data[0]?.id ?? null);

  return (
    <section className="public-section px-4 pb-20 pt-20 md:px-10 md:pb-24">
      <div className="mx-auto max-w-6xl pt-20 pb-20">
        <Reveal className="text-center">
          <h2 className="public-title text-white">Experience Section</h2>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl md:mt-12 px-2" delayMs={120}>
          <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(122,176,208,0.56)_0%,rgba(103,157,190,0.46)_100%)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-7">
            <div className="space-y-3 md:space-y-4">
              {data.map((experience, index) => {
                let html = "";

                try {
                  html = JSON.parse(experience.paragraph).html;
                } catch {
                  html = experience.paragraph;
                }

                const isOpen = open === experience.id;

                return (
                  <div
                    key={experience.id}
                    className="rounded-[1.45rem] bg-transparent"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : experience.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-full border border-cyan-100/10 bg-[#14384c] px-4 py-3 text-left text-white transition duration-300 md:px-5 md:py-4 ${
                        isOpen
                          ? "shadow-[0_12px_26px_rgba(0,0,0,0.18)]"
                          : "hover:bg-[#173f55]"
                      }`}
                      aria-expanded={isOpen}
                      aria-controls={`experience-panel-${experience.id}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-3 w-3 shrink-0 rounded-full border border-cyan-100/60 bg-cyan-200/85 shadow-[0_0_10px_rgba(185,241,255,0.8)]" />
                        <span className="text-base font-semibold leading-tight md:text-[1.05rem]">
                          {experience.title}
                        </span>
                      </span>

                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-100/15 bg-white/5 text-white/95">
                        {isOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </span>
                    </button>

                    <div
                      id={`experience-panel-${experience.id}`}
                      className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? "max-h-[32rem] pt-2 opacity-100"
                          : "max-h-0 pt-0 opacity-0"
                      }`}
                    >
                      <div
                        className={`rounded-[1.45rem] border border-cyan-50/10 bg-[linear-gradient(180deg,rgba(110,161,193,0.62)_0%,rgba(92,145,177,0.56)_100%)] px-4 py-4 text-left text-[#18364A] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] md:px-5 ${
                          index === 0 ? "md:py-5" : "md:py-4"
                        }`}
                      >
                        <div
                          className="prose prose-invert max-w-none text-sm leading-relaxed prose-p:my-1 prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5 prose-li:my-1 prose-strong:text-white md:text-base"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
