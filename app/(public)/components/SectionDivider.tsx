type Props = {
  text: string;
};

export default function SectionDivider({ text }: Props) {
  const content = (text || "PORTFOLIO UNLOCKED").toUpperCase();

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#10232A] via-[#317087] to-[#10232A] py-2">
      <div className="public-marquee gap-12 text-xs font-extrabold tracking-wide text-white/95 md:text-sm">
        {Array(16)
          .fill(content)
          .map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
      </div>
    </div>
  );
}
