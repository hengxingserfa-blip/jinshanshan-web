// JSON-LD 結構化資料:LocalBusiness (JewelryStore) schema 給 Google 抓
// 含 NAP、地理座標、營業時間、評分、社群、服務目錄、付款方式、商圈圖

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shinygold.com.tw";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": `${SITE}#business`,
  name: "金閃閃銀樓 SHINY GOLD Jeweller's",
  alternateName: ["Shiny Gold", "Jin Shan Shan", "Tiệm vàng Trung Lịch"],
  description:
    "桃園中壢誠信銀樓。9999 純金、公開秤重、透明金價、絕不扣耗損。舊金換新、回收、飾金販售、修飾翻新。歡迎中越英印菲泰各國朋友。",
  slogan: "9999 純金 · 公開秤重 · 透明金價 · 無耗損計算",
  url: SITE,
  logo: `${SITE}/logo.png`,
  image: [`${SITE}/logo.png`],
  telephone: "+886-3-280-5908",
  email: "ginogino885566@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "TWD",
  paymentAccepted: "Cash, Credit Card, LINE Pay, Bank Transfer",
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
  hasMap: "https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號",
  areaServed: [
    { "@type": "City", name: "中壢區" },
    { "@type": "City", name: "桃園市" },
    { "@type": "AdministrativeArea", name: "桃園" },
    { "@type": "AdministrativeArea", name: "新竹" },
    { "@type": "AdministrativeArea", name: "台北" },
  ],
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
    bestRating: "5",
    worstRating: "1",
  },
  knowsLanguage: ["zh-TW", "en", "vi", "id", "fil", "th"],
  sameAs: [
    "https://instagram.com/shiny_gold991",
    "https://www.facebook.com/profile.php?id=61575318885967",
    "https://shopee.tw/shiny_gold",
    "https://lin.ee/onfiZgZ",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "金閃閃銀樓 服務項目",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "舊金換新 Gold Renewal",
          description:
            "把抽屜裡的舊金條、舊金飾換成現在想戴的款式。當日金價試算,只補差價。不扣耗損、無火燒費。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "舊金回收 Gold Buy-Back",
          description:
            "公開當日金價、現場秤重、清楚試算。當日現金結清,絕不扣耗損費。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "飾金販售 Jewellery Sales",
          description:
            "9999 純金戒指、項鍊、手鐲、對戒、彌月禮、投資金條。每件附金重證明保證卡。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "修飾翻新 Repair & Refit",
          description:
            "斷鍊、改款、戒圍放大縮小、拋光翻新、寶石重鑲。讓老件再次戴回身上。",
        },
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}#website`,
  url: SITE,
  name: "金閃閃銀樓 SHINY GOLD Jeweller's",
  inLanguage: "zh-TW",
  publisher: { "@id": `${SITE}#business` },
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
