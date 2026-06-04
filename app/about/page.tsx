import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "金閃閃銀樓位於桃園中壢中和路 108 號中平商圈,在地誠信經營。提供舊金換新、回收、飾金販售、修飾服務,公開秤重透明金價,歡迎中越英印菲泰各國朋友。",
};

export default function AboutPage() {
  return <AboutClient />;
}
