// IG 設定 - 純常數 / 類型, client 跟 server 都能 import (不含 supabase 依賴)
// 已新增多種尺寸 + 包含 16:9 / 1:1 等避免跑版的選項

export type IGSize = "S" | "M" | "M_TALL" | "L" | "L_TALL" | "XL";

export interface IGSizeConfig {
  mobile: number;
  desktop: number;
  label: string;
  description: string;
}

// 高度 = iframe 內 IG embed 元件需要的高度,IG embed 包含影片 + caption + footer
// 9:16 直影片 + caption + footer 約需 mobile 480 / desktop 640 才剛好不切
export const IG_SIZES: Record<IGSize, IGSizeConfig> = {
  S: {
    mobile: 360,
    desktop: 460,
    label: "小 S",
    description: "只看影片預覽圖,點開才看影片",
  },
  M: {
    mobile: 480,
    desktop: 620,
    label: "中 M(預設)",
    description: "看得到影片 + 部分 caption,平衡",
  },
  M_TALL: {
    mobile: 560,
    desktop: 700,
    label: "中高 M+",
    description: "略高,完整顯示 caption",
  },
  L: {
    mobile: 640,
    desktop: 780,
    label: "大 L",
    description: "影片明顯,看得到完整內容",
  },
  L_TALL: {
    mobile: 720,
    desktop: 860,
    label: "大高 L+",
    description: "強調影片,接近 IG App 原始尺寸",
  },
  XL: {
    mobile: 820,
    desktop: 960,
    label: "超大 XL",
    description: "主視覺等級,佔大量空間",
  },
};
