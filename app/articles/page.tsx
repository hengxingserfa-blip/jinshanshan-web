import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { getArticles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "金飾知識・文章 | 金閃閃銀樓",
  description:
    "黃金回收、舊金換新、金飾保養、傳家智慧 —— 金閃閃銀樓的金飾知識專欄。",
};

const formatDate = (iso: string | null) =>
  iso ? iso.slice(0, 10).replace(/-/g, ".") : "";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="金飾知識"
        subtitle="從黃金保值、回收眉角到日常保養,我們把店裡多年來的經驗整理成文章。"
      />

      <section className="bg-ivory-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
            {articles.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="group block">
                <div className="aspect-[16/10] relative overflow-hidden bg-ivory-100">
                  {a.hero_image_url && (
                    <Image
                      src={a.hero_image_url}
                      alt={a.title_zh}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                    />
                  )}
                </div>
                <div className="pt-7">
                  <div className="flex items-center gap-4 mb-4">
                    <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase">
                      {a.category_en} · {a.category}
                    </p>
                    <span className="text-ink-400/40">/</span>
                    <p className="text-[10px] tracking-[0.25em] text-ink-400 font-display">
                      {formatDate(a.published_at)}
                    </p>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-ink-950 mb-4 leading-snug group-hover:text-gold-700 transition-colors">
                    {a.title_zh}
                  </h2>
                  {a.excerpt_zh && (
                    <p className="text-sm text-ink-700 leading-loose font-light">
                      {a.excerpt_zh}
                    </p>
                  )}
                  <p className="mt-6 font-display text-[10px] tracking-[0.35em] uppercase text-ink-400 group-hover:text-gold-600 transition-colors">
                    Read More →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-24 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display max-w-md mx-auto">
            完整內文閱讀與更多文章將於後台上線後啟用
          </p>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
