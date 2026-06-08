"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveIgPinned } from "./actions";
import type { IGPost } from "@/lib/instagram";

interface SlotRow {
  slot: number;
  shortcode: string;
  is_video: boolean;
  source_url: string | null;
}

interface Props {
  slots: (SlotRow | null)[];
  latestForFallback: IGPost[];
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

export default function IgAdminForm({ slots, latestForFallback }: Props) {
  const [state, formAction] = useFormState(saveIgPinned, initial);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {slots.map((row, idx) => {
          const slotNum = idx + 1;
          // 預覽:有手動指定就用該 shortcode,沒有就用 latestForFallback 下一個沒被用過的
          const previewShortcode = row?.shortcode;
          const fallbackPost = !row ? latestForFallback[idx] : null;

          return (
            <div
              key={slotNum}
              className="bg-white border border-ink-950/10 p-3 sm:p-4"
            >
              <div className="flex items-start justify-between mb-2 gap-2">
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

              <input
                type="text"
                name={`slot_${slotNum}`}
                defaultValue={row?.source_url ?? ""}
                placeholder="https://www.instagram.com/reel/XXXXX/  ← 留空 = 自動抓最新"
                className="w-full bg-ivory-50 border border-ink-950/15 px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
              />

              {(previewShortcode || fallbackPost) && (
                <div className="mt-3 bg-ink-950/5 border border-ink-950/8 overflow-hidden">
                  <iframe
                    src={`https://www.instagram.com/${row?.is_video ?? fallbackPost?.isVideo ? "reel" : "p"}/${previewShortcode ?? fallbackPost?.shortcode}/embed/`}
                    className="w-full block"
                    style={{ height: "260px", border: 0 }}
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

      <div className="flex justify-end pt-2">
        <SubmitBtn />
      </div>

      <p className="text-[11px] text-ink-400 leading-loose pt-3 border-t border-ink-950/8">
        ※ 規則:有貼網址的格子用手動指定,留空的格子會用 GitHub Actions 每天抓的 IG 最新貼文補上(不會跟手動指定的重複)。
      </p>
    </form>
  );
}
