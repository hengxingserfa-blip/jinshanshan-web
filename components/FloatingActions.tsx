export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col gap-3">
      <a
        href="tel:+88632805908"
        aria-label="撥打電話 (03) 280-5908"
        className="group w-14 h-14 rounded-full bg-ink-950 text-ivory-50 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:bg-gold-500 hover:text-ink-950 transition-colors"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03Z" />
        </svg>
      </a>

      <a
        href="/#contact"
        aria-label="加入 LINE 詢價"
        className="group w-14 h-14 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(155,120,42,0.5)] hover:bg-gold-400 transition-colors"
      >
        <span className="font-display tracking-tighter text-[14px] font-medium">
          LINE
        </span>
      </a>
    </div>
  );
}
