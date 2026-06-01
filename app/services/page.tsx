import Image from "next/image";
import type { Metadata } from "next";
import { IMG } from "@/lib/images";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";

export const metadata: Metadata = {
  title: "服務項目 | 金閃閃銀樓 - 舊金換新、回收、換購、修飾",
  description:
    "金閃閃銀樓四項核心服務:舊金換新、舊金回收、飾金換購、修飾販售。公開金價、現場秤重、絕不扣耗損。",
};

const services = [
  {
    img: IMG.ring2,
    num: "I",
    en: "Renewal",
    title: "舊金換新",
    subtitle: "把記憶留下,把樣式更新",
    body: "抽屜裡那條外婆給的金鏈、結婚時的對戒,款式可能不適合現在的你,但金子的價值仍在。我們以當日金價試算原件價值、折抵新款,只需補上差價,讓老金飾以新樣貌重新回到身上。",
    steps: [
      "帶舊金到店",
      "現場秤重 + 純度檢測",
      "試算可折抵金額",
      "從門市選擇新款",
      "補上差價、完成換購",
    ],
  },
  {
    img: IMG.bar,
    num: "II",
    en: "Recycle",
    title: "舊金回收",
    subtitle: "公開金價,絕不扣耗損",
    body: "黃金回收價每日依國際金價波動,我們堅持公開當日報價、以電子秤精準秤重、清楚試算每一筆換算結果。確認金額後當日現金結清,過程透明,絕不扣除「耗損」或「火燒費」等模糊費用。",
    steps: [
      "LINE 詢今日回收金價",
      "帶金飾到店",
      "現場公開秤重",
      "純度檢測 (K金 / 白金亦可)",
      "清楚試算回收金額",
      "同意後當日付清",
    ],
  },
  {
    img: IMG.necklace2,
    num: "III",
    en: "Boutique",
    title: "飾金換購",
    subtitle: "看得到、摸得到、戴得住",
    body: "線上看圖再美,戴在手上才知道好不好看。我們的門市實體陳列從日常項鍊、手鐲到訂婚對戒、彌月金牌一應俱全,每件附上金重證明與保證卡,送禮、自用、傳家都安心。",
    steps: [
      "親手試戴每一件",
      "金重透明標示",
      "提供保證卡",
      "可現場討論改款或客製",
    ],
  },
  {
    img: IMG.fancy,
    num: "IV",
    en: "Restoration",
    title: "修飾販售",
    subtitle: "讓老件再次戴回身上",
    body: "斷掉的金鏈想修、戒指放大縮小、款式想改、舊金牌想拋光重生 —— 把那條塵封在首飾盒底的老件交給我們,讓它有機會重新戴回身上,而不是一直躺在抽屜裡。",
    steps: [
      "斷鍊接線",
      "戒圍放大 / 縮小",
      "款式改造",
      "拋光翻新",
      "寶石重鑲",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="四項服務"
        subtitle="從舊金換新、回收、換購到修飾,讓每一塊黃金,找到合適的去處。"
      />

      <section className="bg-ivory-50">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`${i % 2 === 1 ? "bg-white" : "bg-ivory-50"} py-24 md:py-32`}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
              <div
                className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7 relative">
                  <div className="aspect-[4/3] relative overflow-hidden bg-ivory-100">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-display text-5xl text-gold-400 mb-6">
                    {s.num}
                  </p>
                  <p className="font-display tracking-[0.45em] text-[10px] text-gold-600 uppercase mb-4">
                    {s.en}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-ink-950 mb-3">
                    {s.title}
                  </h2>
                  <p className="text-gold-700 italic font-serif mb-8 text-lg">
                    {s.subtitle}
                  </p>
                  <div className="w-12 gold-line h-px mb-8" />
                  <p className="text-ink-700 leading-loose mb-10 text-sm md:text-base font-light">
                    {s.body}
                  </p>

                  <div>
                    <p className="font-display tracking-[0.35em] text-[10px] text-ink-400 uppercase mb-5">
                      Process · 流程
                    </p>
                    <ol className="space-y-3">
                      {s.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex gap-5 text-sm text-ink-700 leading-loose"
                        >
                          <span className="shrink-0 font-display text-gold-500 text-sm w-6">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <CtaBlock />
    </>
  );
}
