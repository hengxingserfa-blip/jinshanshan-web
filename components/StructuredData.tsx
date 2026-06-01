// JSON-LD 結構化資料: 給 Google 抓取生成富搜尋結果用.
// LocalBusiness schema 讓 Google 知道這是一間實體店, 含營業時間/地址/電話/評分.

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://jinshanshan.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": `${SITE}#business`,
  name: "金閃閃銀樓 SHINY GOLD Jeweller's",
  alternateName: ["Shiny Gold", "Jin Shan Shan"],
  url: SITE,
  logo: `${SITE}/logo.png`,
  image: `${SITE}/logo.png`,
  telephone: "+886-3-280-5908",
  email: "ginogino885566@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "中和路 108 號",
    addressLocality: "中壢區",
    addressRegion: "桃園市",
    postalCode: "320",
    addressCountry: "TW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.9536,
    longitude: 121.2243,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "10:30",
      closes: "20:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "24",
  },
  sameAs: [
    "https://instagram.com/shiny_gold991",
    "https://www.facebook.com/profile.php?id=61575318885967",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "金閃閃銀樓 服務項目",
    itemListElement: [
      { "@type": "Offer", name: "舊金換新 Old-for-New",       description: "把抽屜裡的金飾換成現在想戴的款式. 當日金價試算, 只補差價." },
      { "@type": "Offer", name: "舊金回收 Gold Buy-Back",     description: "公開當日金價、現場秤重、清楚試算. 當日結清, 絕不扣耗損." },
      { "@type": "Offer", name: "飾金換購 Jewellery Exchange", description: "項鍊、手鐲、對戒, 實體店面親自挑選. 每件附金重證明." },
      { "@type": "Offer", name: "修飾販售 Repair & Refit",    description: "斷鍊、改款、放大縮小、拋光翻新. 讓老件再次戴回身上." },
    ],
  },
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
