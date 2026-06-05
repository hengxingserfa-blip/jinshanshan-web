import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ArticlesGrid from "@/components/ArticlesGrid";
import { getArticles } from "@/lib/data/articles";

const SITE = "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  title: "金飾知識專欄 · 黃金回收 / 保養 / 婚嫁",
  description:
    "黃金一錢是多少?舊金回收前該注意什麼?結婚對戒怎麼挑?彌月金牌怎麼選?金閃閃銀樓專欄帶你看懂金飾與黃金知識。",
  keywords: [
    "黃金知識", "金飾保養", "黃金回收注意事項", "結婚對戒挑選",
    "彌月金牌怎麼選", "黃金一錢多重", "金飾傳家", "中壢銀樓專欄",
  ],
  alternates: { canonical: `${SITE}/articles` },
  openGraph: {
    title: "金飾知識專欄 — 金閃閃銀樓",
    description: "黃金回收、保養、婚嫁、彌月,實用知識專欄。",
    url: `${SITE}/articles`,
    type: "website",
    images: [{ url: SITE + "/logo.png", width: 1200, height: 630, alt: "金閃閃銀樓" }],
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "金飾知識", path: "/articles" }]} />
      <PageHero page="journal" />

      <section className="bg-ivory-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <ArticlesGrid articles={articles} />

          <p className="mt-24 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display max-w-md mx-auto">
            完整內文閱讀與更多文章將於後台上線後啟用
          </p>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
