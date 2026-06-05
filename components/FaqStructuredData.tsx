// FAQPage schema:讓 Google 把 FAQ 變成 "People Also Ask" 富搜尋結果
// 用繁中版,SEO 是搜尋台灣為主
import { getFaq } from "@/lib/i18n/page-content";

export default function FaqStructuredData() {
  const groups = getFaq("zh-TW");
  const mainEntity = groups.flatMap((g) =>
    g.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    }))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
