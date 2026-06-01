"use client";

import { useTransition } from "react";
import { logoutAction } from "./logout/actions";

export default function LogoutButton() {
  const [pending, start] = useTransition();
  return (
    <form action={() => start(() => logoutAction())}>
      <button
        type="submit"
        disabled={pending}
        className="w-full text-left text-xs text-ink-400 hover:text-red-600 transition-colors py-2 px-3"
      >
        {pending ? "登出中…" : "↩ 登出"}
      </button>
    </form>
  );
}
