// JSON-LD 結構化資料:LocalBusiness (JewelryStore) schema 給 Google 抓
// 含 NAP、地理座標、營業時間、評分、社群、服務目錄、付款方式、商圈圖

const SITE = "https://www.shinygold.com.tw";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": `${SITE}#business`,
  name: "金閃閃銀樓 SHINY GOLD Jeweller's",
  alternateName: [
    "Shiny Gold",
    "Shiny Gold Jeweller's",
    "Jin Shan Shan",
    "金閃閃",
    "中壢金閃閃",
    "中壢金閃閃銀樓",
    "桃園金閃閃銀樓",
    "Tiệm vàng Trung Lịch",
    "Tiệm Vàng Sang Sang",
  ],
  description:
    "桃園中壢誠信銀樓。9999 純金、公開秤重、透明金價、絕不扣耗損。舊金換新、回收、飾金販售、修飾翻新。歡迎中越英印菲泰各國朋友。",
  slogan: "9999 純金 · 公開秤重 · 透明金價 · 無耗損計算",
  url: SITE,
  logo: `${SITE}/logo.png`,
  image: [`${SITE}/logo.png`],
  foundingDate: "2026",
  foundingLocation: {
    "@type": "Place",
    name: "桃園市中壢區",
    address: {
      "@type": "PostalAddress",
      addressLocality: "中壢區",
      addressRegion: "桃園市",
      addressCountry: "TW",
    },
  },
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
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "L 小姐" },
      reviewBody:
        "媽媽留下的金鍊放了十幾年捨不得拿出來。在金閃閃,他們現場秤重給我看,試算清清楚楚,還把舊金留下一小塊讓我做成項鍊。回家以後我才哭。",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Ms. Nguyễn" },
      reviewBody:
        "店裡有越南店員,從進門到結帳全程越南話溝通。金價怎麼算、純度怎麼驗,她都用我聽得懂的話講一遍。兩條金鍊回收,當天就拿到現金。",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "C 先生" },
      reviewBody:
        "本來只是路過進來看看,老闆沒有推銷,反而花時間幫我們講解金重跟款式。最後挑到一對對戒,女朋友超喜歡。下次彌月也會回來。",
    },
  ],
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
