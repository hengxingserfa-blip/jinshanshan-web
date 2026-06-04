import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "常見問題 FAQ",
  description:
    "金閃閃銀樓常見問題:舊金回收價格怎麼算?要不要扣火耗?多重才接?多種語言朋友也歡迎詢問。",
};

export default function FaqPage() {
  return <FaqClient />;
}
