"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";

const initialState = { error: "" as string };

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 bg-ink-950 disabled:bg-ink-700 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-6 py-3.5 font-sans font-medium tracking-wider text-sm uppercase transition-colors"
    >
      {pending ? "登入中…" : "登入 Sign In"}
    </button>
  );
}

interface Props {
  configured: boolean;
}

export default function LoginForm({ configured }: Props) {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-6">
      <form
        action={formAction}
        className="w-full max-w-md bg-white border border-ink-950/10 p-10 md:p-12 space-y-6"
      >
        <div className="text-center mb-2">
          <p className="font-sans tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-3 font-medium">
            Admin · 後台登入
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-ink-950">
            金閃閃銀樓
          </h1>
          <div className="w-12 h-px bg-gold-500/60 mx-auto mt-6" />
        </div>

        {!configured ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm leading-relaxed">
            <strong>尚未設定後台密碼。</strong>
            <br />
            請在 <code className="bg-red-100 px-1">.env.local</code> 加入{" "}
            <code className="bg-red-100 px-1">ADMIN_PASSWORD=你的密碼</code>{" "}
            後重啟 dev server。
          </div>
        ) : (
          <>
            <label className="block">
              <span className="block text-xs tracking-[0.2em] text-ink-700 uppercase font-medium mb-2">
                密碼 Password
              </span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                className="w-full bg-transparent border-b border-ink-950/30 focus:border-gold-500 focus:outline-none py-3 text-lg text-ink-950 transition-colors"
              />
            </label>

            {state?.error && (
              <p className="text-sm text-red-600 font-medium">{state.error}</p>
            )}

            <SubmitBtn />

            <p className="text-[11px] text-ink-400 text-center leading-loose">
              密碼來源:`.env.local` 的 <code>ADMIN_PASSWORD</code>
              <br />
              忘記就直接改檔案,改完重啟 dev server 即可。
            </p>
          </>
        )}
      </form>
    </div>
  );
}
