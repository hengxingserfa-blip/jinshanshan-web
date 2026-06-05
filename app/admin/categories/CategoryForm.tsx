"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useTransition, useState } from "react";
import Link from "next/link";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "./actions";

interface Defaults {
  id?: string;
  slug?: string;
  name_zh?: string;
  name_en?: string | null;
  sort_order?: number;
}

const initial = { ok: false, message: "" };

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-ink-950 disabled:bg-ink-700 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-6 py-3 font-sans font-medium tracking-wider text-sm uppercase transition-colors"
    >
      {pending ? "儲存中…" : label}
    </button>
  );
}

export default function CategoryForm({ defaults }: { defaults?: Defaults }) {
  const isEdit = !!defaults?.id;
  const action = isEdit
    ? updateCategoryAction.bind(null, defaults!.id!)
    : createCategoryAction;
  const [state, formAction] = useFormState(action, initial);

  const [deleting, startDelete] = useTransition();
  const [deleteMsg, setDeleteMsg] = useState("");

  return (
    <div className="space-y-6">
      <form action={formAction} className="bg-white border border-ink-950/10 p-4 sm:p-8 space-y-5">
        <Field label="Slug (英文 / 數字 / 連字號)" required>
          <input
            name="slug"
            defaultValue={defaults?.slug ?? ""}
            placeholder="例: pendants"
            required
            pattern="[a-z0-9-]+"
            className={input}
          />
          <p className="text-[11px] text-ink-500 mt-1.5">
            ※ 網址會用到 (例 /products?category=pendants)。一旦商品掛上後不建議改。
          </p>
        </Field>

        <Field label="中文名稱" required>
          <input
            name="name_zh"
            defaultValue={defaults?.name_zh ?? ""}
            placeholder="例: 墜子"
            required
            className={input}
          />
        </Field>

        <Field label="英文名稱(選填)">
          <input
            name="name_en"
            defaultValue={defaults?.name_en ?? ""}
            placeholder="例: Pendants"
            className={input}
          />
        </Field>

        <Field label="排序順位">
          <input
            name="sort_order"
            type="number"
            defaultValue={defaults?.sort_order ?? 99}
            className={input}
          />
          <p className="text-[11px] text-ink-500 mt-1.5">
            ※ 數字小排前面 (戒指 1 / 耳環 2 / ... / 訂製 8)。新分類預設 99。
          </p>
        </Field>

        {state?.message && (
          <p className={`text-sm font-medium ${state.ok ? "text-emerald-700" : "text-red-600"}`}>
            {state.message}
          </p>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-ink-950/10">
          <Link href="/admin/categories" className="text-sm text-ink-400 hover:text-ink-950">
            ← 取消
          </Link>
          <SubmitBtn label={isEdit ? "儲存變更" : "新增分類"} />
        </div>
      </form>

      {isEdit && (
        <div className="bg-red-50 border border-red-200 p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-medium text-red-900 mb-1">刪除分類</p>
            <p className="text-xs text-red-700">
              若還有商品掛在這分類,刪除會被擋下來。
            </p>
          </div>
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (!confirm("確認刪除這個分類?")) return;
              startDelete(async () => {
                const res = await deleteCategoryAction(defaults!.id!);
                if (res.ok) window.location.href = "/admin/categories";
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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
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
