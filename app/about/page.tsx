import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  title: "關於金閃閃銀樓 · 中壢誠信家族店",
  description:
    "金閃閃銀樓位於桃園中壢中和路 108 號中平商圈,在地誠信家族經營。9999 純金、公開秤重、透明金價、絕不扣耗損。歡迎中越英印菲泰各國朋友。",
  keywords: [
    "金閃閃銀樓", "Shiny Gold", "中壢銀樓", "桃園銀樓",
    "中壢中和路 108 號", "中平商圈", "家族經營銀樓", "誠信銀樓",
  ],
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: "關於金閃閃銀樓 · 在地誠信家族店",
    description: "桃園中壢中和路 108 號,9999 純金、公開秤重、絕不扣耗損。",
    url: `${SITE}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
