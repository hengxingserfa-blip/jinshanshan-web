"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { saveIgPinned } from "./actions";
import type { IGPost } from "@/lib/instagram";
import { IG_SIZES, type IGSize } from "@/lib/ig-config";

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
}: Props) {
  const [state, formAction] = useFormState(saveIgPinned, initial);

  // 預覽用 sample reel
  const sampleShortcode =
    latestForFallback[0]?.shortcode ?? "DZUBqm1z8KA";

  // 用 state 控制每格 size + 對照 demo 選擇
  const [slotSizes, setSlotSizes] = useState<Record<number, IGSize>>(() => {
    const init: Record<number, IGSize> = {};
    for (let i = 1; i <= 6; i++) {
      init[i] = (currentSlotSizes[String(i)] ?? "M") as IGSize;
    }
    return init;
  });

  return (
    <form action={formAction} className="space-y-5">
      {/* 對照預覽 — 同一支影片 6 種尺寸並排 */}
      <details className="bg-white border border-ink-950/10" open>
        <summary className="cursor-pointer select-none px-4 sm:px-5 py-3 flex items-center justify-between font-display text-xs tracking-[0.25em] uppercase text-gold-700 font-medium">
          <span>📐 6 種尺寸對照預覽</span>
          <span className="text-ink-400 group-open:rotate-180">▾</span>
        </summary>
        <div className="px-4 sm:px-5 pb-5">
          <p className="text-[11px] text-ink-500 mb-3 leading-loose">
            同一支影片在不同尺寸下的樣子(模擬手機顯示寬度,1 欄)。
            選好之後在下面 6 格各自指定。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SIZE_KEYS.map((key) => {
              const cfg = IG_SIZES[key];
              // 預覽用 mobile 高度 (因為員工大多在手機後台)
              return (
                <div
                  key={key}
                  className="bg-ivory-50 border border-ink-950/10"
                >
                  <div className="px-2 py-1.5 bg-ink-950/5 text-[10px] text-ink-700 font-medium flex items-center justify-between">
                    <span>{cfg.label}</span>
                    <span className="text-ink-400 font-mono">
                      {cfg.mobile}/{cfg.desktop}
                    </span>
                  </div>
                  <iframe
                    src={`https://www.instagram.com/reel/${sampleShortcode}/embed/`}
                    style={{ height: cfg.mobile, border: 0, width: "100%" }}
                    scrolling="no"
                    loading="lazy"
                    title={`預覽 ${cfg.label}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </details>

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

              {/* 即時預覽 iframe (用該格選的 size) */}
              {(previewShortcode || fallbackPost) && (
                <div className="bg-ink-950/5 border border-ink-950/8 overflow-hidden">
                  <iframe
                    src={`https://www.instagram.com/${row?.is_video ?? fallbackPost?.isVideo ? "reel" : "p"}/${previewShortcode ?? fallbackPost?.shortcode}/embed/`}
                    style={{
                      height: IG_SIZES[currentSize].mobile,
                      border: 0,
                      width: "100%",
                      display: "block",
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
