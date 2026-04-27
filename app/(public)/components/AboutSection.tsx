"use client";

import type { About } from "@/types/about";
import Reveal from "./Reveal";

type Props = {
  data: About;
};

export default function AboutSection({ data }: Props) {
  const cardClassName =
    "rounded-[1.35rem] border-[2.5px] border-[#0b2a3a] bg-[linear-gradient(180deg,rgba(29,84,118,0.98)_0%,rgba(19,57,82,0.99)_100%)] px-6 py-5 text-center text-base font-semibold leading-[1.45] text-white shadow-[inset_0_2px_0_rgba(179,231,255,0.1),inset_0_-2px_0_rgba(4,17,25,0.65),0_7px_0_rgba(9,29,42,0.72),0_16px_24px_rgba(0,0,0,0.28)] md:text-[1.02rem]";

  return (
    <section className="public-section overflow-hidden px-2 pb-0 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8 flex flex-col gap-2 md:mb-8 md:pl-4">
          <h2 className="text-4xl pt-10 pl-5 font-extrabold tracking-tight text-[#9fd6ef] md:text-6xl">
            About
          </h2>
          <h3 className="max-w-md text-2xl pl-5 font-bold leading-tight text-white md:text-[2.2rem]">
            {data.subtitle}
          </h3>
        </Reveal>

        <div className="relative hidden pb-0 pt-3 md:block">
          <span className="pointer-events-none absolute inset-x-[18%] bottom-[-4rem] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(89,204,255,0.68)_0%,rgba(89,204,255,0.2)_30%,rgba(89,204,255,0.07)_52%,transparent_76%)] blur-3xl" />
          <span className="pointer-events-none absolute left-[3%] top-[27%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(113,212,255,0.18)_0%,transparent_70%)] blur-3xl" />
          <span className="pointer-events-none absolute right-[5%] top-[14%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(113,212,255,0.14)_0%,transparent_72%)] blur-3xl" />

          <div className="relative min-h-[510px]">
            <Reveal className="absolute left-[50px] top-[152px] z-20 max-w-[362px]">
              <div className={cardClassName}>
                <p>{data.paragraph2}</p>
              </div>
            </Reveal>

            <Reveal
              className="absolute right-[4.7rem] top-[4px] z-20 max-w-[392px]"
              delayMs={120}
            >
              <div className={cardClassName}>
                <p>{data.paragraph1}</p>
              </div>
            </Reveal>

            <Reveal
              className="absolute bottom-[83px] right-[1.9rem] z-20 max-w-[350px]"
              delayMs={240}
            >
              <div className={cardClassName}>
                <p>{data.paragraph3}</p>
              </div>
            </Reveal>

            <Reveal
              className="absolute bottom-[-2px] left-1/2 z-10 -translate-x-1/2"
              delayMs={180}
            >
              <div className="relative">
                <span className="absolute inset-x-[7%] bottom-10 h-52 rounded-full bg-[radial-gradient(circle,rgba(150,232,255,0.74)_0%,rgba(88,197,255,0.22)_44%,transparent_78%)] blur-3xl" />
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.image_url}`}
                  alt="About portrait"
                  className="relative h-[440px] w-[296px] object-cover object-top drop-shadow-[0_24px_35px_rgba(3,12,24,0.55)]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative px-2 pb-1 pt-4 md:hidden">
          <span className="pointer-events-none absolute inset-x-[18%] top-[9.5rem] h-36 rounded-full bg-[radial-gradient(circle,rgba(83,193,255,0.45)_0%,rgba(83,193,255,0.08)_45%,transparent_75%)] blur-2xl" />

          <Reveal className="relative z-10 mx-auto max-w-[16rem]" delayMs={120}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.image_url}`}
              alt="About portrait"
              className="mx-auto h-[250px] w-[180px] object-cover object-top drop-shadow-[0_18px_28px_rgba(3,12,24,0.55)]"
            />
          </Reveal>

          <div className="relative z-10 mt-4 mb-6 space-y-4">
            <Reveal className={cardClassName}>{data.paragraph1}</Reveal>
            <Reveal className={cardClassName} delayMs={200}>
              {data.paragraph2}
            </Reveal>
            <Reveal className={cardClassName} delayMs={280}>
              {data.paragraph3}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
