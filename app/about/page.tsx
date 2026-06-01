import Image from "next/image";
import type { Metadata } from "next";
import { IMG } from "@/lib/images";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";

export const metadata: Metadata = {
  title: "關於金閃閃銀樓 | 桃園中壢的在地誠信銀樓",
  description:
    "金閃閃銀樓位於桃園中壢中和路,在地用心經營的銀樓。公開金價、現場秤重、絕不扣耗損。中文、越南文、印尼文、菲律賓文、泰文,歡迎各國朋友走進來。",
};

const values = [
  {
    num: "I",
    en: "Transparency",
    title: "公開透明",
    body: "當日金價即時公開,現場秤重每一筆都看得到。離店前你都能清楚知道每一個數字怎麼算出來。",
  },
  {
    num: "II",
    en: "Integrity",
    title: "誠信品質",
    body: "金飾來源、純度、重量都附上證明文件。我們相信,信任不是口號,是一筆一筆累積出來的。",
  },
  {
    num: "III",
    en: "Welcome",
    title: "誰來都一樣",
    body: "中壢是一座有各國朋友的城市。中文、越南、印尼、菲律賓、泰文 —— 走進店裡,你就是我們的朋友。",
  },
];

const reasons = [
  {
    en: "No Hidden Cost",
    title: "絕不扣耗損",
    body: "業界常見的「耗損費」、「火燒費」一律不收。實際金重多少,就算多少。",
  },
  {
    en: "Multi-language",
    title: "多語溝通",
    body: "中文、Tiếng Việt、Bahasa Indonesia、Filipino、ภาษาไทย —— 我們會用最簡單的方式讓您聽得懂。",
  },
  {
    en: "Same Day",
    title: "當日結清",
    body: "舊金回收當日現金付清,不拖延、不分期、不扣手續費。",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Welcome · 歡迎"
        title="街坊鄰居的銀樓"
        subtitle="在桃園中壢中和路,一家小店、一群朋友、一份用心。歡迎所有國家的朋友走進來。"
      />

      <section className="bg-ivory-50 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] relative overflow-hidden bg-ivory-100">
              <Image
                src={IMG.aboutAtmosphere}
                alt="金閃閃銀樓"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="font-display tracking-[0.45em] text-gold-600 text-[10px] mb-8 uppercase">
              Our Story
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-ink-950 mb-8 leading-[1.1]">
              一家從這條街上
              <br />
              <span className="italic font-serif text-gold-500">長出來</span>
              的小店
            </h2>
            <div className="w-12 gold-line h-px mb-10" />
            <div className="space-y-5 text-ink-700 leading-loose text-sm md:text-base font-light">
              <p>
                金閃閃銀樓開在桃園中壢中和路 108 號。一家不大的店,做的是街坊鄰居的生意。
              </p>
              <p>
                結婚、彌月、訂婚、舊金換新、回收、修飾 —— 鄰居們有大大小小的事,都會走進我們的小店找我們聊聊。
              </p>
              <p>
                中壢是一座匯集各國朋友的城市。所以我們的櫃檯前,常常坐著從越南、印尼、菲律賓、泰國來的朋友。語言不一定通,但只要走進來,我們會用最簡單的方式,讓你買得安心、賣得放心。
              </p>
              <p className="text-ink-950">
                這就是金閃閃想做的銀樓 —— 一家中壢街坊鄰居的小店,也是一家各國朋友都能放心走進來的銀樓。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-28 md:py-40 border-y border-ink-950/8">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center mb-20 md:mb-24">
            <p className="font-display tracking-[0.45em] text-gold-600 text-[10px] mb-6 uppercase">
              Our Values
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ink-950">
              我們相信的三件事
            </h2>
            <div className="w-12 gold-line h-px mx-auto mt-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white hover:bg-ivory-50 transition-colors p-12 md:p-14"
              >
                <p className="font-display text-4xl text-gold-400 mb-6">
                  {v.num}
                </p>
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-3">
                  {v.en}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-ink-950 mb-5">
                  {v.title}
                </h3>
                <p className="text-sm text-ink-700 leading-loose font-light">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-50 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center mb-20">
            <p className="font-display tracking-[0.45em] text-gold-600 text-[10px] mb-6 uppercase">
              Why Shiny Gold
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ink-950">
              為什麼選擇金閃閃
            </h2>
            <div className="w-12 gold-line h-px mx-auto mt-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {reasons.map((r) => (
              <div key={r.title}>
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-4">
                  {r.en}
                </p>
                <h3 className="font-display text-2xl text-ink-950 mb-4">
                  {r.title}
                </h3>
                <div className="w-8 gold-line h-px mb-5" />
                <p className="text-sm text-ink-700 leading-loose font-light">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
