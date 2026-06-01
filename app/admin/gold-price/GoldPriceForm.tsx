"use client";

import { useFormState, useFormStatus } from "react-dom";
import { setGoldOverrideAction } from "./actions";

const initial = { ok: false, message: "" };

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-ink-950 disabled:bg-ink-700 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-8 py-3.5 font-sans font-medium tracking-wider text-sm uppercase transition-colors"
    >
      {pending ? "儲存中…" : "儲存今日金價"}
    </button>
  );
}

interface Props {
  defaultDate: string;
  defaultPrice?: number;
  defaultNote?: string;
}

export default function GoldPriceForm({
  defaultDate,
  defaultPrice,
  defaultNote,
}: Props) {
  const [state, formAction] = useFormState(setGoldOverrideAction, initial);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-xs tracking-[0.2em] text-gold-700 uppercase font-medium mb-2">
            日期 Date
          </span>
          <input
            type="date"
            name="date"
            defaultValue={defaultDate}
            required
            className="w-full bg-white border border-ink-950/15 focus:border-gold-500 focus:outline-none py-2.5 px-3 text-ink-950 text-sm"
          />
        </label>
        <label className="block">
          <span className="block text-xs tracking-[0.2em] text-gold-700 uppercase font-medium mb-2">
            9999 飾金回收 NT$ / 錢
          </span>
          <input
            type="number"
            name="price"
            min={1}
            step={1}
            defaultValue={defaultPrice ?? ""}
            placeholder="例如 16620"
            required
            className="w-full bg-white border border-ink-950/15 focus:border-gold-500 focus:outline-none py-2.5 px-3 text-ink-950 text-lg font-semibold"
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-xs tracking-[0.2em] text-gold-700 uppercase font-medium mb-2">
          備註 Note (選填)
        </span>
        <input
          type="text"
          name="note"
          defaultValue={defaultNote ?? ""}
          placeholder="例如:配合詮美晨間牌告"
          className="w-full bg-white border border-ink-950/15 focus:border-gold-500 focus:outline-none py-2.5 px-3 text-ink-950 text-sm"
        />
      </label>

      {state?.message && (
        <p
          className={`text-sm font-medium ${
            state.ok ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <SubmitBtn />
    </form>
  );
}
