import Ornament from "@/components/Ornament";

const reviews = [
  {
    name: "L 小姐",
    occasion: "母親遺物舊金換新",
    quote:
      "媽媽留下的金鍊放了十幾年捨不得拿出來。在金閃閃,他們現場秤重給我看,試算清清楚楚,還把舊金留下一小塊讓我做成項鍊。回家以後我才哭。",
  },
  {
    name: "Ms. Nguyễn",
    occasion: "舊金回收",
    quote:
      "我講越南話,他們慢慢用簡單的中文跟我溝通,還拿紙筆寫給我看。我帶兩條金鍊回收,給我的價錢比另外兩家好,當天就拿到現金。",
  },
  {
    name: "C 先生 . 桃園",
    occasion: "訂婚對戒",
    quote:
      "本來只是路過進來看看,老闆沒有推銷,反而花時間幫我們講解金重跟款式。最後挑到一對對戒,女朋友超喜歡。下次彌月也會回來。",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ivory-50 py-32 md:py-44 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            Voices · 真實見證
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950">
            走進來過的<span className="italic font-serif text-gold-500"> 朋友</span>
          </h2>
          <Ornament className="mt-10" />
          <p className="mt-10 text-xs tracking-wider text-ink-400 font-display">
            ★ Google 5.0 · 24+ 在地真實評價
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="bg-ivory-50 hover:bg-white transition-colors p-10 md:p-12 flex flex-col"
            >
              <span className="font-display text-6xl gold-foil leading-none mb-6">
                &ldquo;
              </span>
              <blockquote className="flex-1 text-ink-700 leading-loose text-sm md:text-base font-light italic mb-8">
                {r.quote}
              </blockquote>
              <figcaption className="border-t border-ink-950/8 pt-6">
                <p className="font-display text-lg text-ink-950 mb-1">
                  {r.name}
                </p>
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase">
                  {r.occasion}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display">
          ※ 為保護隱私,顧客姓名已部分匿名處理.見證內容為示意,正式上線後將更新真實客戶回饋
        </p>
      </div>
    </section>
  );
}
