import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CtaBlock from "@/components/CtaBlock";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getProductBySlug, getProductsByCategory } from "@/lib/data/products";

const SITE = "https://www.shinygold.com.tw";

const CATEGORY_LABELS: Record<string, { zh: string; en: string }> = {
  rings: { zh: "戒指", en: "Rings" },
  earrings: { zh: "耳環", en: "Earrings" },
  necklaces: { zh: "項鍊", en: "Necklaces" },
  bracelets: { zh: "手鐲", en: "Bracelets" },
  wedding: { zh: "對戒", en: "Wedding" },
  newborn: { zh: "彌月禮品", en: "Newborn" },
  bullion: { zh: "金條", en: "Bullion" },
  custom: { zh: "訂製金飾", en: "Custom" },
};

const LINE_OA = "452rajhx";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "找不到商品" };
  const cat = CATEGORY_LABELS[p.category]?.zh ?? "金飾";
  const weight = p.weight_qian ? ` · ${p.weight_qian} 錢` : "";
  const title = `${p.name_zh}${weight} · 9999 純金${cat}`;
  const description = `${p.name_zh}${weight},中壢金閃閃銀樓 9999 純金${cat}實際庫存。每件附金重證明,公開秤重透明金價。LINE 預約看貨或來電 (03) 280-5908。SKU ${p.slug}。`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE}/products/${slug}` },
    openGraph: {
      title: `${p.name_zh}${weight} | 金閃閃銀樓`,
      description,
      url: `${SITE}/products/${slug}`,
      type: "website",
      images: p.image_url
        ? [{ url: p.image_url, width: 1200, height: 1200, alt: p.name_zh }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name_zh}${weight}`,
      description,
      images: p.image_url ? [p.image_url] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.available) notFound();

  const cat = CATEGORY_LABELS[product.category] ?? { zh: "金飾", en: "Item" };
  const weight = product.weight_qian ? `${product.weight_qian} 錢` : "現場確認";
  const purity = product.purity || "9999 純金";

  // 同類商品(其他 6 個)
  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.slug !== slug)
    .slice(0, 6);

  const lineMsg = `您好,我想詢問這款金飾:\n${product.name_zh}${product.weight_qian ? ` · ${product.weight_qian} 錢` : ""}\n(SKU: ${product.slug})`;
  const lineUrl = `https://line.me/R/oaMessage/@${LINE_OA}/?${encodeURIComponent(lineMsg)}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_zh,
    image: product.image_url ? [product.image_url] : undefined,
    sku: product.slug,
    category: cat.zh,
    description: `${product.name_zh}${product.weight_qian ? ` · ${product.weight_qian} 錢` : ""},中壢金閃閃銀樓 9999 純金${cat.zh}實際庫存。`,
    brand: { "@type": "Brand", name: "金閃閃銀樓 SHINY GOLD Jeweller's" },
    material: purity,
    ...(product.weight_qian
      ? {
          weight: {
            "@type": "QuantitativeValue",
            value: product.weight_qian,
            unitText: "錢",
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "TWD",
      availability: "https://schema.org/InStock",
      businessFunction: "https://schema.org/Sell",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE}#business` },
      url: `${SITE}/products/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: "金飾選品", path: "/products" },
          { name: `${cat.zh}`, path: `/products?category=${product.category}` },
          { name: product.name_zh, path: `/products/${slug}` },
        ]}
      />

      <section className="bg-ivory-50 pt-20 md:pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          {/* 麵包屑 (給用戶看) */}
          <nav className="mb-8 text-[10px] tracking-[0.3em] uppercase font-display text-ink-400">
            <Link href="/" className="hover:text-gold-600">首頁</Link>
            <span className="mx-2">›</span>
            <Link href="/products" className="hover:text-gold-600">金飾選品</Link>
            <span className="mx-2">›</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-gold-600">
              {cat.zh}
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* 大圖 */}
            <div className="relative aspect-square bg-white border border-ink-950/8 overflow-hidden">
              {product.image_url && (
                <Image
                  src={product.image_url}
                  alt={`${product.name_zh} · 9999 純金${cat.zh} · 金閃閃銀樓`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                  unoptimized
                />
              )}
              {product.featured && (
                <span className="absolute top-3 left-3 bg-gold-500 text-ink-950 text-[10px] tracking-[0.25em] uppercase font-display px-2.5 py-1">
                  精選
                </span>
              )}
            </div>

            {/* 商品資訊 */}
            <div className="flex flex-col">
              <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-3">
                {cat.en} · {cat.zh}
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-ink-950 mb-3 leading-tight">
                {product.name_zh}
              </h1>
              {product.name_en && (
                <p className="text-sm tracking-wider text-ink-400 mb-6 font-serif italic">
                  {product.name_en}
                </p>
              )}

              <div className="border-y border-ink-950/8 py-6 my-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                    純度 Purity
                  </p>
                  <p className="text-ink-950 text-base">{purity}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                    重量 Weight
                  </p>
                  <p className="text-ink-950 text-base">{weight}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                    款式編號 SKU
                  </p>
                  <p className="text-ink-950 text-xs tracking-wider font-mono">{product.slug}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                    庫存
                  </p>
                  <p className="text-ink-950 text-base">現貨可看</p>
                </div>
              </div>

              <p className="text-sm text-ink-700 leading-loose font-light mb-8">
                這款金飾為實際庫存,中壢中和路 108 號實體店面可看可試戴。歡迎來店,或透過 LINE / 電話預約看貨。指定重量、款式都可以提出,我們為您整理相近款。
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between bg-[#06C755] text-white hover:opacity-90 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-opacity"
                >
                  <span>LINE 詢問此款</span>
                  <span>→</span>
                </a>
                <a
                  href="tel:+88632805908"
                  className="inline-flex items-center justify-between bg-ink-950 text-ivory-50 hover:bg-gold-500 hover:text-ink-950 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
                >
                  <span>來電 (03) 280-5908</span>
                  <span>→</span>
                </a>
                <Link
                  href="/reserve"
                  className="inline-flex items-center justify-between border border-ink-950/30 text-ink-950 hover:border-gold-500 hover:text-gold-600 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
                >
                  <span>預約看店</span>
                  <span>→</span>
                </Link>
              </div>

              <p className="text-[10px] tracking-wider text-ink-400 font-display mt-6 text-center">
                ※ 金價每日浮動 · 以來店現場為準
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 同類推薦 — internal linking 強化 */}
      {related.length > 0 && (
        <section className="bg-white py-20 md:py-28 border-t border-ink-950/8">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-3 text-center">
              More from {cat.en}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-ink-950 text-center mb-12">
              更多{cat.zh}款式
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-8">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group">
                  <div className="aspect-square sm:aspect-[3/4] relative overflow-hidden bg-ivory-100">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={`${p.name_zh} · 9999 純金${cat.zh}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
                        unoptimized
                      />
                    )}
                    {p.weight_qian != null && p.weight_qian > 0 && (
                      <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-ink-950/85 text-ivory-50 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1 backdrop-blur-sm">
                        {p.weight_qian} 錢
                      </span>
                    )}
                  </div>
                  <div className="pt-2 sm:pt-4">
                    <h3 className="font-display text-sm sm:text-lg text-ink-950 line-clamp-2 leading-snug">
                      {p.name_zh}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href={`/products?category=${product.category}`}
                className="inline-flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase font-display text-ink-950 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 pb-1.5 transition-colors"
              >
                <span>看全部{cat.zh}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBlock />
    </>
  );
}
