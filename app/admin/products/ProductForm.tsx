"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useTransition, useState } from "react";
import Link from "next/link";
import { createProductAction, updateProductAction, deleteProductAction } from "./actions";
import ImageUpload from "../_components/ImageUpload";
import TranslationsEditor from "../_components/TranslationsEditor";
import type { Translations } from "@/lib/supabase/types";
import type { ProductCategory } from "@/lib/data/categories";

const PURITIES = ["9999", "999", "18K", "14K", "9K", "PT"];

interface ProductDefaults {
  id?: string;
  slug?: string;
  category?: string;
  name_zh?: string;
  name_en?: string | null;
  description_zh?: string | null;
  image_url?: string | null;
  weight_qian?: number | null;
  purity?: string | null;
  featured?: boolean;
  available?: boolean;
  sort_order?: number;
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

export default function ProductForm({
  defaults,
  categories,
}: {
  defaults?: ProductDefaults;
  categories: ProductCategory[];
}) {
  const isEdit = !!defaults?.id;
  const action = isEdit
    ? updateProductAction.bind(null, defaults!.id!)
    : createProductAction;
  const [state, formAction] = useFormState(action, initial);

  const [deleting, startDelete] = useTransition();
  const [deleteMsg, setDeleteMsg] = useState("");

  return (
    <div className="space-y-8">
      <form action={formAction} className="bg-white border border-ink-950/10 p-4 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Slug (英文+數字+連字號)" required>
            <input
              name="slug"
              defaultValue={defaults?.slug ?? ""}
              placeholder="例: classic-ring"
              required
              className={input}
            />
          </Field>
          <Field label="分類" required>
            <select
              name="category"
              defaultValue={defaults?.category ?? categories[0]?.slug ?? "rings"}
              required
              className={input}
            >
              {/* 樹狀:先列頂層,再列其底下子分類 (縮排呈現) */}
              {categories
                .filter((c) => !c.parent_slug)
                .sort((a, b) => a.sort_order - b.sort_order)
                .flatMap((parent) => [
                  <option key={parent.slug} value={parent.slug}>
                    {parent.name_zh}
                    {parent.name_en ? ` ${parent.name_en}` : ""}
                  </option>,
                  ...categories
                    .filter((c) => c.parent_slug === parent.slug)
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((child) => (
                      <option key={child.slug} value={child.slug}>
                        　└─ {child.name_zh}
                        {child.name_en ? ` ${child.name_en}` : ""}
                      </option>
                    )),
                ])}
            </select>
            <p className="text-[11px] text-ink-500 mt-1.5">
              ※ 沒看到需要的分類?{" "}
              <a href="/admin/categories" className="text-gold-700 underline">
                到分類管理新增
              </a>{" "}
              (可新增子分類, 例:項鍊 → 套鍊系列)
            </p>
          </Field>
          <Field label="中文名稱" required>
            <input
              name="name_zh"
              defaultValue={defaults?.name_zh ?? ""}
              placeholder="例: 經典平面戒指"
              required
              className={input}
            />
          </Field>
          <Field label="英文名稱(選填)">
            <input
              name="name_en"
              defaultValue={defaults?.name_en ?? ""}
              placeholder="例: Classic Plain Ring"
              className={input}
            />
          </Field>
          <Field label="純度">
            <select name="purity" defaultValue={defaults?.purity ?? "9999"} className={input}>
              {PURITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="金重 (錢)">
            <input
              name="weight_qian"
              type="number"
              step="0.01"
              defaultValue={defaults?.weight_qian ?? ""}
              placeholder="例: 3.75"
              className={input}
            />
          </Field>
        </div>

        <ImageUpload
          name="image_url"
          folder="products"
          defaultUrl={defaults?.image_url}
          label="商品圖"
        />

        <Field label="商品描述(選填)">
          <textarea
            name="description_zh"
            defaultValue={defaults?.description_zh ?? ""}
            rows={3}
            placeholder="例: 純度 9999, 以細緻雕花呈現經典銀樓工藝..."
            className={input}
          />
        </Field>

        <div className="grid sm:grid-cols-3 gap-6 items-end">
          <Field label="排序順位">
            <input
              name="sort_order"
              type="number"
              defaultValue={defaults?.sort_order ?? 0}
              className={input}
            />
          </Field>
          <Toggle name="featured" label="精選 (首頁顯示)" defaultChecked={defaults?.featured ?? false} />
          <Toggle name="available" label="上架" defaultChecked={defaults?.available ?? true} />
        </div>

        <TranslationsEditor
          name="translations"
          defaultValue={defaults?.translations}
          fields={[
            { key: "name",        label: "商品名稱",  base: defaults?.name_zh ?? null },
            { key: "description", label: "商品描述",  base: defaults?.description_zh ?? null, multiline: true },
          ]}
        />

        {state?.message && (
          <p className={`text-sm font-medium ${state.ok ? "text-emerald-700" : "text-red-600"}`}>
            {state.message}
          </p>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-ink-950/10">
          <Link href="/admin/products" className="text-sm text-ink-400 hover:text-ink-950">
            ← 取消, 回列表
          </Link>
          <SubmitBtn label={isEdit ? "儲存變更" : "新增商品"} />
        </div>
      </form>

      {isEdit && (
        <div className="bg-red-50 border border-red-200 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-red-900 mb-1">永久刪除商品</p>
            <p className="text-xs text-red-700">不能復原. 想暫時下架請改用上面的「上架」開關.</p>
          </div>
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (!confirm("確認刪除這個商品?無法復原")) return;
              startDelete(async () => {
                const res = await deleteProductAction(defaults!.id!);
                if (res.ok) window.location.href = "/admin/products";
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

function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 select-none cursor-pointer">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="w-4 h-4 accent-gold-500" />
      <span className="text-sm text-ink-950">{label}</span>
    </label>
  );
}
