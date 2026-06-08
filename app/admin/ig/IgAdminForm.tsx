"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { saveIgPinned } from "./actions";
import type { IGPost } from "@/lib/instagram";
import { IG_SIZES, type IGSize, type IGColsConfig } from "@/lib/ig-config";

interface SlotRow {
  slot: number;
  shortcode: string;
  is_video: boolean;
  source_url: string | null;
}

interface Props {
  slots: (SlotRow | null)[];
  latestForFallback: IGPost[];
  currentSize: IGSize;
  currentSlotSizes: Record<string, IGSize>;
  currentCols: IGColsConfig;
}

const initial = { ok: false, message: "" };

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-ink-950 disabled:bg-ink-700 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-6 py-3 font-sans font-medium tracking-wider text-sm uppercase transition-colors"
    >
      {pending ? "儲存中…" : "儲存 6 格設定"}
    </button>
  );
}

const SIZE_KEYS: IGSize[] = ["S", "M", "M_TALL", "L", "L_TALL", "XL"];
const SHORT_LABEL: Record<IGSize, string> = {
  S: "S",
  M: "M",
  M_TALL: "M+",
  L: "L",
  L_TALL: "L+",
  XL: "XL",
};

export default function IgAdminForm({
  slots,
  latestForFallback,
  currentSlotSizes,
  currentCols,
}: Props) {
  const [state, formAction] = useFormState(saveIgPinned, initial);

  // 用 state 控制每格 size
  const [slotSizes, setSlotSizes] = useState<Record<number, IGSize>>(() => {
    const init: Record<number, IGSize> = {};
    for (let i = 1; i <= 6; i++) {
      init[i] = (currentSlotSizes[String(i)] ?? "M") as IGSize;
    }
    return init;
  });

  // 欄數 - 控制影片大小
  const [colsMobile, setColsMobile] = useState<1 | 2>(currentCols.mobile);
  const [colsDesktop, setColsDesktop] = useState<2 | 3>(currentCols.desktop);

  return (
    <form action={formAction} className="space-y-5">
      {/* 欄數設定 — 真正控制影片大小 */}
      <div className="bg-white border border-ink-950/10 p-4 sm:p-5">
        <p className="font-display text-xs tracking-[0.25em] uppercase text-gold-700 font-medium mb-3">
          🎬 影片大小 (= 欄數)
        </p>
        <p className="text-[11px] text-ink-600 mb-3 leading-loose">
          ⚠️ IG embed 影片大小由<strong>欄數</strong>決定 — 欄數少, 每格寬, 影片大。
          下面每格的「裁切高度」只控制底下空白要不要顯示, 不會讓影片變大。
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-ink-500 mb-1.5">📱 手機欄數:</p>
            <div className="flex gap-2">
              {([1, 2] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setColsMobile(n)}
                  className={`flex-1 px-3 py-2 text-xs font-medium border transition-colors ${
                    colsMobile === n
                      ? "bg-gold-500 text-ink-950 border-gold-500"
                      : "bg-ivory-50 text-ink-700 border-ink-950/15 hover:border-gold-400"
                  }`}
                >
                  {n} 欄
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-ink-500 mb-1.5">🖥️ 桌機欄數:</p>
            <div className="flex gap-2">
              {([2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setColsDesktop(n)}
                  className={`flex-1 px-3 py-2 text-xs font-medium border transition-colors ${
                    colsDesktop === n
                      ? "bg-gold-500 text-ink-950 border-gold-500"
                      : "bg-ivory-50 text-ink-700 border-ink-950/15 hover:border-gold-400"
                  }`}
                >
                  {n} 欄
                </button>
              ))}
            </div>
          </div>
        </div>
        <input type="hidden" name="ig_cols_mobile" value={colsMobile} />
        <input type="hidden" name="ig_cols_desktop" value={colsDesktop} />
        <p className="text-[11px] text-ink-500 mt-3 leading-loose">
          推薦: 手機 2 欄 + 桌機 3 欄 (預設 / 視訊小)。
          想要影片更大 → 手機 1 欄 / 桌機 2 欄 (但 6 格就會排很長)。
        </p>
      </div>
      {/* 前台實際效果預覽 — 用當前 6 格設定模擬首頁 */}
      <FrontendPreview
        slots={slots}
        latestForFallback={latestForFallback}
        slotSizes={slotSizes}
        colsMobile={colsMobile}
        colsDesktop={colsDesktop}
      />

      {/* 6 格設定 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {slots.map((row, idx) => {
          const slotNum = idx + 1;
          const previewShortcode = row?.shortcode;
          const fallbackPost = !row ? latestForFallback[idx] : null;
          const currentSize = slotSizes[slotNum] ?? "M";

          return (
            <div
              key={slotNum}
              className="bg-white border border-ink-950/10 p-3 sm:p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-gold-700 font-medium">
                  第 {slotNum} 格
                </p>
                {row ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                    手動指定
                  </span>
                ) : (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    自動抓 IG 最新
                  </span>
                )}
              </div>

              {/* IG URL */}
              <input
                type="text"
                name={`slot_${slotNum}`}
                defaultValue={row?.source_url ?? ""}
                placeholder="https://www.instagram.com/reel/XXXXX/  ← 留空=自動抓最新"
                className="w-full bg-ivory-50 border border-ink-950/15 px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
              />

              {/* 該格 size 選擇 (6 個 mini button) */}
              <div>
                <p className="text-[10px] text-ink-500 mb-1.5">這格大小:</p>
                <div className="grid grid-cols-6 gap-1">
                  {SIZE_KEYS.map((key) => {
                    const active = currentSize === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSlotSizes((s) => ({ ...s, [slotNum]: key }))}
                        className={`px-1.5 py-1.5 text-[11px] font-medium border transition-colors ${
                          active
                            ? "bg-gold-500 text-ink-950 border-gold-500"
                            : "bg-ivory-50 text-ink-700 border-ink-950/15 hover:border-gold-400"
                        }`}
                      >
                        {SHORT_LABEL[key]}
                      </button>
                    );
                  })}
                </div>
                {/* hidden input 把選擇丟進 form */}
                <input
                  type="hidden"
                  name={`size_${slotNum}`}
                  value={currentSize}
                />
              </div>

              {/* 即時預覽 iframe (overflow:hidden 裁底下空白 + 放大去黑邊) */}
              {(previewShortcode || fallbackPost) && (
                <div
                  className="bg-ink-950/5 border border-ink-950/8 relative"
                  style={{ height: IG_SIZES[currentSize].mobileHeight, overflow: "hidden" }}
                >
                  <iframe
                    src={`https://www.instagram.com/${row?.is_video ?? fallbackPost?.isVideo ? "reel" : "p"}/${previewShortcode ?? fallbackPost?.shortcode}/embed/`}
                    style={{
                      height: 1200,
                      border: 0,
                      width: "118%",
                      position: "absolute",
                      left: "50%",
                      top: -60,
                      transform: "translateX(-50%)",
                    }}
                    scrolling="no"
                    loading="lazy"
                    allowTransparency
                    title={`預覽 slot ${slotNum}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {state.message && (
        <p
          className={`text-sm font-medium ${
            state.ok ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="flex justify-end pt-2 sticky bottom-4">
        <SubmitBtn />
      </div>

      <p className="text-[11px] text-ink-400 leading-loose pt-3 border-t border-ink-950/8">
        ※ 每格大小可以不一樣。例:slot 1, 3, 5 用「大 L」, slot 2, 4, 6 用「中 M」,
        做出層次感。所有尺寸都不會跑版,6 格永遠手機 2 欄 / 桌機 3 欄排。
      </p>
    </form>
  );
}

// ────────────────────────────────────────────────────────
// 前台實際效果預覽 (即時跟著 slotSizes 狀態變)
// ────────────────────────────────────────────────────────
function FrontendPreview({
  slots,
  latestForFallback,
  slotSizes,
  colsMobile,
  colsDesktop,
}: {
  slots: (SlotRow | null)[];
  latestForFallback: IGPost[];
  slotSizes: Record<number, IGSize>;
  colsMobile: 1 | 2;
  colsDesktop: 2 | 3;
}) {
  const [view, setView] = useState<"mobile" | "desktop">("mobile");

  // 組裝 6 個要顯示的 shortcode (pinned 優先,空格用 fallback)
  const previewPosts: { shortcode: string; isVideo: boolean }[] = [];
  // 已 pinned 的 shortcode 不要重複出現
  const pinnedSet = new Set(
    slots.filter((s): s is SlotRow => !!s).map((s) => s.shortcode)
  );
  const fallbackQueue = latestForFallback.filter(
    (p) => !pinnedSet.has(p.shortcode)
  );
  let fbIdx = 0;
  for (let i = 0; i < 6; i++) {
    const row = slots[i];
    if (row) {
      previewPosts.push({ shortcode: row.shortcode, isVideo: row.is_video });
    } else {
      const next = fallbackQueue[fbIdx++];
      if (next) {
        previewPosts.push({ shortcode: next.shortcode, isVideo: next.isVideo });
      }
    }
  }

  // 跟前台一致的欄數
  const cols = view === "mobile" ? colsMobile : colsDesktop;
  // 預覽容器寬度:模擬手機 380px 寬,模擬桌機 1000px 寬
  const containerW = view === "mobile" ? 380 : 1000;

  return (
    <details className="bg-white border border-ink-950/10" open>
      <summary className="cursor-pointer select-none px-4 sm:px-5 py-3 flex items-center justify-between font-display text-xs tracking-[0.25em] uppercase text-gold-700 font-medium">
        <span>📱 前台實際效果預覽</span>
        <span className="text-ink-400 normal-case tracking-normal text-[10px] font-normal">
          (跟著下面設定即時變)
        </span>
      </summary>
      <div className="px-4 sm:px-5 pb-5">
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setView("mobile")}
            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
              view === "mobile"
                ? "bg-ink-950 text-ivory-50 border-ink-950"
                : "bg-ivory-50 text-ink-700 border-ink-950/15 hover:border-gold-400"
            }`}
          >
            📱 手機
          </button>
          <button
            type="button"
            onClick={() => setView("desktop")}
            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
              view === "desktop"
                ? "bg-ink-950 text-ivory-50 border-ink-950"
                : "bg-ivory-50 text-ink-700 border-ink-950/15 hover:border-gold-400"
            }`}
          >
            🖥️ 桌機
          </button>
          <p className="text-[11px] text-ink-500 ml-2">
            手機 2 欄 / 桌機 3 欄
          </p>
        </div>

        {/* 模擬容器 — 用實際寬度 + scroll bar 給後台看 */}
        <div className="overflow-x-auto -mx-4 sm:-mx-5 px-4 sm:px-5">
          <div
            className="bg-ivory-50 p-3 mx-auto"
            style={{ width: containerW, maxWidth: "100%" }}
          >
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {previewPosts.map((p, i) => {
                const size = slotSizes[i + 1] ?? "M";
                const cfg = IG_SIZES[size];
                // 容器裁切高度 (iframe 內部仍 1200, overflow:hidden)
                const h = view === "mobile" ? cfg.mobileHeight : cfg.desktopHeight;
                return (
                  <div
                    key={i}
                    className="bg-white border border-ink-950/8"
                  >
                    {/* overflow:hidden 容器,只露出 top h px + 放大 1.18 去黑邊 */}
                    <div style={{ height: h, overflow: "hidden", position: "relative" }}>
                      <iframe
                        src={`https://www.instagram.com/${p.isVideo ? "reel" : "p"}/${p.shortcode}/embed/`}
                        style={{
                          height: 1200,
                          width: "118%",
                          border: 0,
                          position: "absolute",
                          left: "50%",
                          top: -60,
                          transform: "translateX(-50%)",
                        }}
                        scrolling="no"
                        loading="lazy"
                        title={`預覽 slot ${i + 1}`}
                      />
                    </div>
                    <div className="px-2 py-1 text-[10px] text-ink-500 bg-ivory-100 border-t border-ink-950/8 flex justify-between">
                      <span>第 {i + 1} 格</span>
                      <span className="font-mono text-ink-400">{size} · {h}px</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="text-[11px] text-ink-500 mt-3 leading-loose">
          ↑ 這就是訪客在 {view === "mobile" ? "手機" : "桌機"} 上看到首頁 IG 區塊的樣子。
          下面改完任一格大小,這上面會立刻跟著變。
        </p>
      </div>
    </details>
  );
}
