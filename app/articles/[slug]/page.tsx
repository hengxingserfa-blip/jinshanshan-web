import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import CtaBlock from "@/components/CtaBlock";
import Ornament from "@/components/Ornament";
import { getArticles } from "@/lib/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const all = await getArticles();
  const article = all.find((a) => a.slug === slug);
  if (!article) return { title: "找不到文章 | 金閃閃銀樓" };
  return {
    title: `${article.title_zh} | 金閃閃銀樓`,
    description: article.excerpt_zh ?? undefined,
    openGraph: {
      title: article.title_zh,
      description: article.excerpt_zh ?? undefined,
      type: "article",
      images: article.hero_image_url ? [article.hero_image_url] : [],
    },
  };
}

const formatDate = (iso: string | null) =>
  iso ? iso.slice(0, 10).replace(/-/g, ".") : "";

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const all = await getArticles();
  const article = all.find((a) => a.slug === slug);
  if (!article) notFound();

  const html = article.content_zh
    ? marked.parse(article.content_zh, { breaks: true })
    : "";

  // 推薦其他 3 篇
  const others = all.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-ivory-50 border-b border-ink-950/8">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 pt-20 md:pt-28 pb-12 md:pb-16 text-center">
          <p className="font-sans tracking-[0.4em] text-[11px] text-gold-600 uppercase mb-6 font-medium">
            {article.category_en} · {article.category}
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-ink-950 mb-6 leading-[1.2]">
            {article.title_zh}
          </h1>
          <p className="text-sm text-ink-400 tracking-wider font-light">
            {formatDate(article.published_at)}
          </p>
        </div>
      </section>

      {article.hero_image_url && (
        <section className="bg-ivory-50">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div className="aspect-[16/9] relative overflow-hidden bg-ivory-100">
              <Image
                src={article.hero_image_url}
                alt={article.title_zh}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </section>
      )}

      <article className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-10">
          {article.excerpt_zh && (
            <p className="text-base md:text-lg text-ink-700 italic font-serif leading-loose mb-10 pb-10 border-b border-ink-950/8">
              {article.excerpt_zh}
            </p>
          )}

          {html ? (
            <div
              className="prose-article text-ink-800 text-base leading-loose"
              dangerouslySetInnerHTML={{ __html: html as string }}
            />
          ) : (
            <p className="text-sm text-ink-400 italic">
              完整內文待後台編輯。如需這篇主題的詳細資訊,歡迎來店或 LINE 詢問。
            </p>
          )}

          <Ornament className="my-16" />

          <div className="text-center">
            <Link
              href="/articles"
              className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-sans font-medium text-ink-950 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 pb-1.5 transition-colors"
            >
              <span>← Back to Journal</span>
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-ivory-50 py-20 md:py-28 border-t border-ink-950/8">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <p className="font-sans tracking-[0.4em] text-[11px] text-gold-600 uppercase mb-3 font-medium text-center">
              More from Journal
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-ink-950 text-center mb-12">
              其他文章
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {others.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-ivory-100 mb-5">
                    {a.hero_image_url && (
                      <Image
                        src={a.hero_image_url}
                        alt={a.title_zh}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
                        unoptimized
                      />
                    )}
                  </div>
                  <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase font-medium mb-2">
                    {a.category_en}
                  </p>
                  <h3 className="font-display text-lg md:text-xl text-ink-950 leading-snug group-hover:text-gold-700 transition-colors">
                    {a.title_zh}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBlock />
    </>
  );
}
