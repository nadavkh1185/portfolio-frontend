"use client";

import type { Skill } from "@/types/skill";
import Reveal from "./Reveal";

type Props = {
  data: Skill[];
};

function SkillRow({
  items,
  reverse = false,
}: {
  items: Skill[];
  reverse?: boolean;
}) {
  const cloned = [...items, ...items];

  return (
    <div className="overflow-hidden rounded-none border-y border-cyan-100/15 bg-white/20 py-5 backdrop-blur-sm md:rounded-none md:px-4">
      <div className={reverse ? "skill-track-right" : "skill-track-left"}>
        {cloned.map((item, index) => (
          <img
            key={`${item.id}-${index}`}
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image_url}`}
            alt={item.image_title}
            className="h-16 w-16 rounded-2xl object-contain md:h-20 md:w-20"
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection({ data }: Props) {
  return (
    <section className="public-section px-0 md:px-10">
      <div className="mx-auto max-w-6xl text-center pt-20">
        <Reveal>
          <h2 className="public-title text-white">Skills Section</h2>
          <p className="mt-4 text-lg font-semibold text-white">
            Tech Stack &amp; Tools I Work With
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 flex max-w-[98rem] flex-col pb-20 gap-5 md:mt-14 md:pb-20">
        <Reveal delayMs={120}>
          <SkillRow items={data} />
        </Reveal>
        <Reveal delayMs={220}>
          <SkillRow items={[...data].reverse()} reverse />
        </Reveal>
      </div>
    </section>
  );
}
