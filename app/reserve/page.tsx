import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "預約看店 | 金閃閃銀樓 SHINY GOLD Jeweller's",
  description:
    "預約金閃閃銀樓的看店時段。舊金回收、換新、換購、修飾、訂製,選擇您方便的時間,我們在桃園中壢中和路 108 號等您。",
};

export default function ReservePage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve · 預約看店"
        title="選個時間,我們等您"
        subtitle="預約讓我們能事先準備.公開金價、現場秤重、絕不扣耗損。"
      />

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
