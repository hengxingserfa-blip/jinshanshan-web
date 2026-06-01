import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import Ornament from "@/components/Ornament";

const occasions = [
  {
    en: "Wedding",
    title: "結婚囍金",
    desc: "對戒、囍餅金、入門金條 ── 為一輩子的承諾準備。",
    img: IMG.pair,
  },
  {
    en: "Newborn",
    title: "彌月禮品",
    desc: "刻字金牌、平安金鎖,把祝福留給寶寶的成長記憶。",
    img: IMG.fancy,
  },
  {
    en: "Engagement",
    title: "訂婚對戒",
    desc: "親手試戴、現場討論款式,讓最重要的瞬間有最合適的戒。",
    img: IMG.ring1,
  },
  {
    en: "Mother's Day",
    title: "母親節獻禮",
    desc: "把心意換成她值得的光,5 月限定加碼活動進行中。",
    img: IMG.necklace2,
  },
  {
    en: "New Year",
    title: "過年招財",
    desc: "金條、財神金幣、招財金飾 —— 在新年第一筆,投入價值。",
    img: IMG.bar,
  },
  {
    en: "Investment",
    title: "投資金條",
    desc: "9999 純金,從五錢到一兩、多種規格,長期保值首選。",
    img: IMG.bracelet1,
  },
];

export default function OccasionCategories() {
  return (
    <section className="bg-white py-32 md:py-44 border-y border-ink-950/8">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            For Every Occasion
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950">
            為每個場合,
            <br />
            <span className="italic font-serif gold-foil">
              選一塊合適的金
            </span>
          </h2>
          <Ornament className="mt-10" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
          {occasions.map((o) => (
            <Link
              key={o.title}
              href="/products"
              className="group bg-white hover:bg-ivory-50 transition-colors p-8 md:p-10 flex gap-6"
            >
              <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 relative overflow-hidden bg-ivory-100">
                <Image
                  src={o.img}
                  alt={o.title}
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-2">
                  {o.en}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-ink-950 mb-3">
                  {o.title}
                </h3>
                <p className="text-xs text-ink-700 leading-loose font-light mb-3">
                  {o.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase font-display text-ink-400 group-hover:text-gold-600 transition-colors">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
