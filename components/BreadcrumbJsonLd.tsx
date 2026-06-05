// 共用 BreadcrumbList JSON-LD —— 讓 Google 在搜尋結果顯示麵包屑階層
const SITE = "https://www.shinygold.com.tw";

interface Crumb {
  name: string;
  path: string;
}

export default function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  const items = [
    { name: "首頁", path: "/" },
    ...trail,
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
