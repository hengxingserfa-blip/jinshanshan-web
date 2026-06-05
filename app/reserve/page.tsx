import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ReservationForm from "@/components/ReservationForm";

const SITE = "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  title: "預約看店 · 中壢金閃閃銀樓",
  description:
    "預約金閃閃銀樓看店時段。舊金回收、換新、換購、修飾、訂製金飾 / 對戒,選擇您方便時段。中壢中和路 108 號,每日 10:30–20:30,中越英印菲泰各國語言皆可。",
  keywords: [
    "金閃閃銀樓預約", "中壢銀樓預約", "舊金回收預約", "金飾訂製預約",
    "對戒預約看店", "彌月金牌預約",
  ],
  alternates: { canonical: `${SITE}/reserve` },
  openGraph: {
    title: "預約看店 · 中壢金閃閃銀樓",
    description: "舊金回收、換新、訂製、修飾,挑時段、留訊息,我們聯絡您。",
    url: `${SITE}/reserve`,
    type: "website",
  },
};

export default function ReservePage() {
  return (
    <>
      <PageHero page="reserve" />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <ReservationForm />

          <div className="mt-12 grid sm:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
            {[
              { en: "Address", zh: "地址", val: "桃園中壢中和路 108 號" },
              { en: "Hours", zh: "營業", val: "每日 10:30 – 20:30" },
              { en: "Phone", zh: "電話", val: "(03) 280-5908" },
            ].map((b) => (
              <div key={b.en} className="bg-ivory-50 p-6 md:p-7">
                <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-2">
                  {b.en} · {b.zh}
                </p>
                <p className="text-sm text-ink-950">{b.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
