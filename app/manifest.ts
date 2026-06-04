import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "金閃閃銀樓 SHINY GOLD Jeweller's",
    short_name: "金閃閃",
    description:
      "桃園中壢誠信銀樓 · 9999 純金 · 公開秤重 · 透明金價 · 無耗損計算",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fbf8f3",
    theme_color: "#0a0a0a",
    lang: "zh-TW",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
