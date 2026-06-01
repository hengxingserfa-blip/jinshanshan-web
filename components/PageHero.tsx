import Ornament from "@/components/Ornament";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="bg-ivory-50 border-b border-ink-950/8 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 pt-28 md:pt-36 pb-24 md:pb-32 text-center">
        <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-10 uppercase animate-fade-in">
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink-950 mb-10 leading-[1.05] animate-fade-up">
          {title}
        </h1>
        <Ornament className="mb-10" />
        {subtitle && (
          <p className="text-sm md:text-base text-ink-700 max-w-xl mx-auto leading-loose font-light animate-fade-up">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
