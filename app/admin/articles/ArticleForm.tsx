"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useTransition, useState } from "react";
import Link from "next/link";
import { createArticleAction, updateArticleAction, deleteArticleAction } from "./actions";
import ImageUpload from "../_components/ImageUpload";
import TranslationsEditor from "../_components/TranslationsEditor";
import type { Translations } from "@/lib/supabase/types";

interface ArticleDefaults {
  id?: string;
  slug?: string;
  category?: string;
  category_en?: string;
  title_zh?: string;
  excerpt_zh?: string | null;
  content_zh?: string | null;
  hero_image_url?: string | null;
  published?: boolean;
  published_at?: string | null;
  translations?: Translations | null;
}

const initial = { ok: false, message: "" };

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-ink-950 disabled:bg-ink-700 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-8 py-3.5 font-sans font-medium tracking-wider text-sm uppercase transition-colors"
    >
      {pending ? "儲存中…" : label}
    </button>
  );
}

export default function ArticleForm({ defaults }: { defaults?: ArticleDefaults }) {
  const isEdit = !!defaults?.id;
  const action = isEdit
    ? updateArticleAction.bind(null, defaults!.id!)
    : createArticleAction;
  const [state, formAction] = useFormState(action, initial);
  const [deleting, startDelete] = useTransition();
  const [deleteMsg, setDeleteMsg] = useState("");

  const defaultDate = defaults?.published_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-8">
      <form action={formAction} className="bg-white border border-ink-950/10 p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Slug" required>
            <input name="slug" defaultValue={defaults?.slug ?? ""} placeholder="例: gold-weight-units" required className={input} />
          </Field>
          <Field label="發布日期">
            <input name="published_at" type="date" defaultValue={defaultDate} className={input} />
          </Field>
          <Field label="中文分類" required>
            <input name="category" defaultValue={defaults?.category ?? "黃金知識"} placeholder="例: 黃金知識" required className={input} />
          </Field>
          <Field label="英文分類" required>
            <input name="category_en" defaultValue={defaults?.category_en ?? "Knowledge"} placeholder="例: Knowledge" required className={input} />
          </Field>
        </div>

        <Field label="標題" required>
          <input name="title_zh" defaultValue={defaults?.title_zh ?? ""} placeholder="例: 黃金一錢是多少?" required className={input} />
        </Field>

        <ImageUpload
          name="hero_image_url"
          folder="articles"
          defaultUrl={defaults?.hero_image_url}
          label="封面圖"
        />

        <Field label="摘要 Excerpt(選填)">
          <textarea name="excerpt_zh" defaultValue={defaults?.excerpt_zh ?? ""} rows={3} placeholder="文章 list 頁顯示的短摘要..." className={input} />
        </Field>

        <Field label="內文 Content(支援 Markdown)">
          <textarea name="content_zh" defaultValue={defaults?.content_zh ?? ""} rows={15} placeholder="# 標題\n\n段落..." className={`${input} font-mono text-xs`} />
          <p className="text-[11px] text-ink-400 mt-1.5">
            目前儲存純文字 / Markdown 原始碼. Phase 4.6 會加 Markdown 即時預覽.
          </p>
        </Field>

        <Toggle name="published" label="發布到網站(取消勾選 = 草稿)" defaultChecked={defaults?.published ?? false} />

        <TranslationsEditor
          name="translations"
          defaultValue={defaults?.translations}
          fields={[
            { key: "title",   label: "標題",     base: defaults?.title_zh ?? null },
            { key: "excerpt", label: "摘要",     base: defaults?.excerpt_zh ?? null, multiline: true },
            { key: "content", label: "內文",     base: (defaults?.content_zh ?? null)?.slice(0, 80) ?? null, multiline: true },
          ]}
        />

        {state?.message && (
          <p className={`text-sm font-medium ${state.ok ? "text-emerald-700" : "text-red-600"}`}>{state.message}</p>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-ink-950/10">
          <Link href="/admin/articles" className="text-sm text-ink-400 hover:text-ink-950">← 取消, 回列表</Link>
          <SubmitBtn label={isEdit ? "儲存變更" : "新增文章"} />
        </div>
      </form>

      {isEdit && (
        <div className="bg-red-50 border border-red-200 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-red-900 mb-1">永久刪除文章</p>
            <p className="text-xs text-red-700">不能復原. 想暫時下架請取消勾「發布」.</p>
          </div>
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (!confirm("確認刪除這篇文章?無法復原")) return;
              startDelete(async () => {
                const res = await deleteArticleAction(defaults!.id!);
                if (res.ok) window.location.href = "/admin/articles";
                else setDeleteMsg(res.message);
              });
            }}
            className="text-sm text-red-700 hover:text-white hover:bg-red-600 border border-red-300 hover:border-red-600 px-4 py-2 transition-colors"
          >
            {deleting ? "刪除中…" : "刪除"}
          </button>
        </div>
      )}
      {deleteMsg && <p className="text-sm text-red-600">{deleteMsg}</p>}
    </div>
  );
}

const input =
  "w-full bg-white border border-ink-950/15 focus:border-gold-500 focus:outline-none py-2.5 px-3 text-ink-950 text-sm";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-[0.2em] text-gold-700 uppercase font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function Toggle({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-3 select-none cursor-pointer">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="w-4 h-4 accent-gold-500" />
      <span className="text-sm text-ink-950">{label}</span>
    </label>
  );
}
