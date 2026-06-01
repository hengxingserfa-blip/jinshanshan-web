import Ornament from "@/components/Ornament";

export default function CtaBlock() {
  return (
    <section className="bg-ink-950 text-ivory-50 py-28 md:py-40 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 40%, rgba(155,120,42,0.3), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 sm:px-10 text-center">
        <p className="font-display tracking-[0.5em] text-gold-300 text-[10px] uppercase mb-8">
          Make an Enquiry
        </p>
        <h2 className="font-display text-4xl md:text-6xl mb-10">
          直接<span className="italic font-serif gold-foil">問</span>就好
        </h2>
        <Ornament className="mb-10" />
        <p className="text-ivory-50/65 text-sm md:text-base leading-loose font-light mb-14">
          加 LINE 詢價、撥電話、來店都可以。
          <br />
          我們在桃園中壢中和路 108 號等您。
        </p>
        <div className="flex flex-wrap justify-center gap-12">
          <a
            href="tel:+88632805908"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ivory-50 pb-2 border-b border-ivory-50 hover:border-gold-300 hover:text-gold-300 transition-colors"
          >
            <span>Call (03) 280-5908</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ivory-50/70 hover:text-gold-300 pb-2 transition-colors"
          >
            <span>Direction</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
