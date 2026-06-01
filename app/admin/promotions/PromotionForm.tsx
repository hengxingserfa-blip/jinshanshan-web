"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useTransition, useState } from "react";
import Link from "next/link";
import { createPromotionAction, updatePromotionAction, deletePromotionAction } from "./actions";

interface PromotionDefaults {
  id?: string;
  title_zh?: string;
  title_en?: string | null;
  body_zh?: string;
  starts_at?: string;
  ends_at?: string;
  cta_label?: string | null;
  cta_url?: string | null;
  active?: boolean;
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

function isoToLocal(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function PromotionForm({ defaults }: { defaults?: PromotionDefaults }) {
  const isEdit = !!defaults?.id;
  const action = isEdit
    ? updatePromotionAction.bind(null, defaults!.id!)
    : createPromotionAction;
  const [state, formAction] = useFormState(action, initial);
  const [deleting, startDelete] = useTransition();
  const [deleteMsg, setDeleteMsg] = useState("");

  return (
    <div className="space-y-8">
      <form action={formAction} className="bg-white border border-ink-950/10 p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="標題 (顯示在 TopBar 左側)" required>
            <input name="title_zh" defaultValue={defaults?.title_zh ?? ""} placeholder="例: 5 月限定" required className={input} />
          </Field>
          <Field label="英文標題(選填)">
            <input name="title_en" defaultValue={defaults?.title_en ?? ""} placeholder="例: May Special" className={input} />
          </Field>
        </div>

        <Field label="活動內容" required>
          <input name="body_zh" defaultValue={defaults?.body_zh ?? ""} placeholder="例: 母親節黃金回收加碼活動進行中" required className={input} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="開始時間" required>
            <input name="starts_at" type="datetime-local" defaultValue={isoToLocal(defaults?.starts_at)} required className={input} />
          </Field>
          <Field label="結束時間" required>
            <input name="ends_at" type="datetime-local" defaultValue={isoToLocal(defaults?.ends_at)} required className={input} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="CTA 文字(選填)">
            <input name="cta_label" defaultValue={defaults?.cta_label ?? ""} placeholder="例: 詢問詳情" className={input} />
          </Field>
          <Field label="CTA 連結(選填)">
            <input name="cta_url" defaultValue={defaults?.cta_url ?? ""} placeholder="例: /#contact 或 https://..." className={input} />
          </Field>
        </div>

        <Toggle name="active" label="啟用(在時間範圍內顯示)" defaultChecked={defaults?.active ?? true} />

        {state?.message && (
          <p className={`text-sm font-medium ${state.ok ? "text-emerald-700" : "text-red-600"}`}>{state.message}</p>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-ink-950/10">
          <Link href="/admin/promotions" className="text-sm text-ink-400 hover:text-ink-950">← 取消, 回列表</Link>
          <SubmitBtn label={isEdit ? "儲存變更" : "新增活動"} />
        </div>
      </form>

      {isEdit && (
        <div className="bg-red-50 border border-red-200 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-red-900 mb-1">永久刪除活動</p>
            <p className="text-xs text-red-700">不能復原. 想暫時停用請取消勾「啟用」.</p>
          </div>
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (!confirm("確認刪除這個活動?")) return;
              startDelete(async () => {
                const res = await deletePromotionAction(defaults!.id!);
                if (res.ok) window.location.href = "/admin/promotions";
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
