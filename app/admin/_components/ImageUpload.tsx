"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadImageAction } from "../_actions/upload";

interface Props {
  name: string;          // form 欄位名(等同表單裡那個 image_url hidden input)
  folder: string;        // 存哪個子資料夾: products / articles
  defaultUrl?: string | null;
  label?: string;
}

export default function ImageUpload({
  name,
  folder,
  defaultUrl,
  label = "圖片",
}: Props) {
  const [url, setUrl] = useState<string>(defaultUrl ?? "");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setMsg(null);
    const fd = new FormData();
    fd.append("file", file);
    start(async () => {
      const res = await uploadImageAction(folder, fd);
      if (res.ok && res.url) {
        setUrl(res.url);
        setMsg({ ok: true, text: "上傳完成" });
      } else {
        setMsg({ ok: false, text: res.message ?? "上傳失敗" });
      }
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs tracking-[0.2em] text-gold-700 uppercase font-medium">
        {label}
      </p>

      {/* 預覽 + 上傳區 */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-32 h-32 relative bg-ivory-100 border border-ink-950/10 overflow-hidden">
          {url ? (
            <Image
              src={url}
              alt="預覽"
              fill
              sizes="128px"
              className="object-cover"
              unoptimized={url.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-ink-400 tracking-wider uppercase">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={pending}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = ""; // 同檔案可重新選
            }}
            className="block text-xs"
          />
          <p className="text-[11px] text-ink-400">
            支援 JPG / PNG / WebP / GIF, 10 MB 內
          </p>
          {pending && <p className="text-xs text-gold-700">上傳中…</p>}
          {msg && (
            <p
              className={`text-xs font-medium ${
                msg.ok ? "text-emerald-700" : "text-red-600"
              }`}
            >
              {msg.text}
            </p>
          )}
          {url && (
            <div className="flex items-center gap-3 text-[11px] text-ink-400">
              <span className="truncate max-w-[260px] font-mono">{url}</span>
              <button
                type="button"
                onClick={() => {
                  setUrl("");
                  setMsg(null);
                }}
                className="text-red-600 hover:underline shrink-0"
              >
                移除
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 隱藏欄位, form submit 時送出當前 URL */}
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
