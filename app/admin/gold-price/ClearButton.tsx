"use client";

import { useTransition, useState } from "react";
import { clearGoldOverrideAction } from "./actions";

export default function ClearButton({ date }: { date: string }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string>("");
  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={() =>
          start(async () => {
            const res = await clearGoldOverrideAction(date);
            setMsg(res.message);
          })
        }
        disabled={pending}
        className="text-xs text-red-600 hover:text-red-700 hover:underline transition-colors"
      >
        {pending ? "處理中…" : "停用此筆覆寫"}
      </button>
      {msg && <span className="text-xs text-emerald-700">{msg}</span>}
    </div>
  );
}
