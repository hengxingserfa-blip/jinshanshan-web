// IG 顯示設定 - 純常數/類型 (client + server 都能用)
//
// IG 官方 embed widget 的結構:
//   ┌─────────────────────────┐
//   │ 帳號名稱 + View profile  │ ← header ~60px
//   ├─────────────────────────┤
//   │                         │
//   │     [影片]              │ ← width × 16/9 直影片
//   │                         │
//   ├─────────────────────────┤
//   │ ♥ 💬 ↗  · likes         │ ← footer ~60px
//   │ caption                 │
//   │ Add a comment...        │
//   └─────────────────────────┘
//
// 「影片的大小」由 iframe 寬度決定 (越寬影片越大), 不是 iframe 高度。
// iframe 高度只是讓底下 caption/likes 有空間。
//
// 所以我們提供兩個獨立設定:
//   1. 欄數 (cols)         — 控制每格寬度 = 控制影片大小
//   2. 顯示模式 (showInfo) — 控制 iframe 多高 / 裁多少底下空白

export type IGSize = "S" | "M" | "L" | "XL" | "M_TALL" | "L_TALL";

export interface IGSizeConfig {
  // 影片區內裁顯示高度 (整個 iframe 始終是 1200px, 容器 overflow:hidden 切到這個高度)
  mobileHeight: number;
  desktopHeight: number;
  label: string;
  description: string;
}

// 6 個尺寸 = 6 種裁掉底下空白的程度 (mobile 寬約 180px, desktop 寬約 300px)
// 影片佔的高度大約 = 寬 × 1.7 (header + 9:16 視訊區)
export const IG_SIZES: Record<IGSize, IGSizeConfig> = {
  S: {
    mobileHeight: 280,
    desktopHeight: 380,
    label: "影片精簡",
    description: "只看影片, 沒底下空白",
  },
  M: {
    mobileHeight: 360,
    desktopHeight: 500,
    label: "影片+按鈕",
    description: "影片 + 愛心 / 留言 / 分享 鈕",
  },
  M_TALL: {
    mobileHeight: 440,
    desktopHeight: 580,
    label: "影片+簡介",
    description: "加上 likes 數 + 短 caption",
  },
  L: {
    mobileHeight: 520,
    desktopHeight: 660,
    label: "完整資訊",
    description: "影片 + 完整 caption + 留言框",
  },
  L_TALL: {
    mobileHeight: 620,
    desktopHeight: 760,
    label: "加長",
    description: "完整 + 多餘空白 (caption 長)",
  },
  XL: {
    mobileHeight: 740,
    desktopHeight: 880,
    label: "完整 widget",
    description: "全部都顯示, 含底下大量留白",
  },
};

// 欄數設定 — 控制影片大小的關鍵
export type IGCols = 1 | 2 | 3;

export interface IGColsConfig {
  mobile: 1 | 2;       // 手機:1 或 2 欄
  desktop: 2 | 3;      // 桌機:2 或 3 欄
}

// 影片預估顯示寬度 (px),給後台預覽用
export function estimateVideoWidth(
  view: "mobile" | "desktop",
  cols: IGColsConfig
): number {
  if (view === "mobile") {
    // 手機螢幕約 380px (扣 padding)
    return cols.mobile === 1 ? 360 : 175;
  }
  // 桌機容器 max 1280px (扣 padding 約 1200), 但留 margin 用 1000
  return cols.desktop === 2 ? 480 : 310;
}
