const greetings = [
  { lang: "ZH", word: "歡迎光臨" },
  { lang: "VI", word: "Xin chào" },
  { lang: "ID", word: "Selamat datang" },
  { lang: "TL", word: "Mabuhay" },
  { lang: "TH", word: "ยินดีต้อนรับ" },
  { lang: "EN", word: "Welcome" },
];

export default function WelcomeStrip() {
  return (
    <section className="bg-ink-950 text-ivory-50 py-10 md:py-12 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(155,120,42,0.25), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-4">
        {greetings.map((g, i) => (
          <div key={g.lang} className="flex items-center gap-3">
            <span className="font-display tracking-[0.5em] text-[10px] text-gold-300/70 uppercase">
              {g.lang}
            </span>
            <span className="font-serif italic text-base md:text-xl text-ivory-50/95">
              {g.word}
            </span>
            {i < greetings.length - 1 && (
              <span className="hidden md:inline-block ml-6 md:ml-8 w-1 h-1 rotate-45 bg-gold-500/60" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
