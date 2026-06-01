import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";

export const metadata: Metadata = {
  title: "常見問題 FAQ | 金閃閃銀樓",
  description:
    "金閃閃銀樓常見問題:黃金回收、舊金換新、商品保證、客製、多語服務等。",
};

const groups = [
  {
    en: "Recycle",
    title: "關於舊金回收",
    items: [
      {
        q: "黃金一錢多少錢?怎麼換算?",
        a: "黃金回收價每天會跟著國際金價浮動。台灣常用「錢」做單位,1 錢 = 3.75 公克。實際每錢多少錢請當日加 LINE 或來電詢問,我們會告訴你最即時的回收價。",
      },
      {
        q: "你們的回收會扣耗損嗎?",
        a: "不會。我們不扣「耗損費」、不收「火燒費」。實際秤出多少金重,就用當日金價乘以該重量,清楚試算。",
      },
      {
        q: "不確定金飾是不是純金,可以來檢測嗎?",
        a: "可以。我們門市備有專業驗金儀器,可現場檢測純度。即使最後您決定不回收,檢測也是免費的。",
      },
      {
        q: "沒有保證卡的舊金可以回收嗎?",
        a: "完全可以。許多舊金、家裡傳下來的飾品都沒有保證卡,只要金子是真的、純度檢測出來,我們就以當日金價回收。",
      },
      {
        q: "K金、白金、鉑金能回收嗎?",
        a: "可以。K金 (14K、18K)、白金、鉑金都收。回收價依各自含金量 / 純度換算。",
      },
    ],
  },
  {
    en: "Renewal",
    title: "關於舊金換新",
    items: [
      {
        q: "換新一定要補差價嗎?",
        a: "看情況。如果您舊金的金重比新款多,我們會退差額給您;反之則補差價。一切都以當日金價公開試算。",
      },
      {
        q: "舊金折抵的金額怎麼算?",
        a: "公式很簡單:舊金實際重量 × 純度 × 當日金價 = 可折抵金額。現場秤、現場算、客人看得到每一個數字。",
      },
      {
        q: "可以一邊換、一邊保留一些舊金的金額嗎?",
        a: "可以。例如舊金折抵超過新款的部分,我們可以直接現金結清差額。",
      },
    ],
  },
  {
    en: "Boutique",
    title: "關於商品與客製",
    items: [
      {
        q: "你們的金飾都附保證卡嗎?",
        a: "是的。所有出售的金飾都附上含金重證明的保證卡,日後若想轉手或回收都有依據。",
      },
      {
        q: "商品可以線上下單嗎?",
        a: "目前還在準備中。後台上線後將開放線上預訂與留位,完成後我們會更新公告。現階段請以 LINE 或電話聯絡。",
      },
      {
        q: "婚戒、對戒可以客製嗎?",
        a: "可以。從刻字、改款到完全客製打造都有提供,歡迎到店討論需求。",
      },
      {
        q: "彌月金牌可以刻字嗎?",
        a: "可以。寶寶姓名、出生日期、祝福語等都能刻。",
      },
    ],
  },
  {
    en: "Service",
    title: "關於服務",
    items: [
      {
        q: "需要預約嗎?",
        a: "不需要,門市每日 10:30 – 20:30 都歡迎直接來店。如果是大額交易或特殊客製,建議先 LINE 預約讓我們先準備。",
      },
      {
        q: "你們有提供修飾、改款服務嗎?",
        a: "有。斷鍊接線、戒圍放大縮小、款式改造、拋光翻新、寶石重鑲等都可以,詳見「服務項目」頁面。",
      },
      {
        q: "越南、印尼、菲律賓、泰國語客人怎麼辦?",
        a: "歡迎來店!我們的官方網站正在準備中文 / 越南文 / 英文 / 印尼文 / 菲律賓文 / 泰文 六語版本,門市也歡迎以您熟悉的語言溝通,我們會盡力協助。",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ · 常見問題"
        title="想問的,直接問"
        subtitle="想問的、沒問到的,都歡迎直接 LINE 或來電。"
      />

      <section className="bg-ivory-50 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 space-y-20">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="font-display tracking-[0.45em] text-[10px] text-gold-600 uppercase mb-3">
                {g.en}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-ink-950 mb-2">
                {g.title}
              </h2>
              <div className="w-12 gold-line h-px mb-8" />
              <div className="divide-y divide-ink-950/8 border-y border-ink-950/8">
                {g.items.map((it, idx) => (
                  <details key={idx} className="group">
                    <summary className="cursor-pointer list-none py-6 flex items-start gap-6 select-none">
                      <span className="font-display text-gold-500 text-sm shrink-0 mt-1 w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-ink-950 font-light text-base leading-relaxed">
                        {it.q}
                      </span>
                      <span className="font-display text-gold-500 text-lg shrink-0 group-open:rotate-45 transition-transform duration-300">
                        +
                      </span>
                    </summary>
                    <div className="pb-7 pl-12 text-sm text-ink-700 leading-loose font-light">
                      {it.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
