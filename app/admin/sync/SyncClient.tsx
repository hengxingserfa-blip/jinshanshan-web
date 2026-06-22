"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: any;
  }
}

interface SyncEvent {
  type: "log" | "progress" | "summary" | "error" | "done";
  message?: string;
  current?: number;
  total?: number;
  ok?: number;
  skip?: number;
  fail?: number;
}

export default function SyncClient({ googleClientId }: { googleClientId: string }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [folderUrl, setFolderUrl] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [summary, setSummary] = useState({ ok: 0, skip: 0, fail: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const tokenClientRef = useRef<any>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // GIS 載入後初始化 token client
  const initTokenClient = () => {
    if (!window.google?.accounts?.oauth2 || !googleClientId) return;
    tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id: googleClientId,
      scope:
        "https://www.googleapis.com/auth/drive.readonly " +
        "https://www.googleapis.com/auth/spreadsheets.readonly " +
        "https://www.googleapis.com/auth/userinfo.email",
      callback: async (resp: { access_token: string; error?: string }) => {
        if (resp.error) {
          appendLog(`❌ 授權失敗:${resp.error}`);
          return;
        }
        setAccessToken(resp.access_token);
        // 撈 email
        try {
          const r = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${resp.access_token}` },
          });
          const u = await r.json();
          setUserEmail(u.email || "(unknown)");
          appendLog(`✓ 登入成功:${u.email}`);
        } catch {
          setUserEmail("(unknown)");
        }
      },
    });
  };

  const appendLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-49), msg]);
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 10);
  };

  const onLogin = () => {
    if (!tokenClientRef.current) {
      appendLog("⚠ Google 登入 client 還沒就緒,稍候再試");
      return;
    }
    tokenClientRef.current.requestAccessToken({ prompt: "consent" });
  };

  const onLogout = () => {
    setAccessToken(null);
    setUserEmail(null);
    appendLog("已登出");
  };

  const onSync = async () => {
    if (!accessToken || !folderUrl.trim()) return;
    setSyncing(true);
    setLogs([]);
    setProgress({ current: 0, total: 0 });
    setSummary({ ok: 0, skip: 0, fail: 0 });
    appendLog("📡 連線同步中...");

    try {
      const res = await fetch("/api/sync/drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, folderUrl: folderUrl.trim() }),
      });
      if (!res.ok || !res.body) {
        appendLog(`❌ 連線失敗 HTTP ${res.status}`);
        setSyncing(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          try {
            const ev: SyncEvent = JSON.parse(line.slice(5).trim());
            if (ev.type === "log" && ev.message) appendLog(ev.message);
            else if (ev.type === "progress" && ev.current != null && ev.total != null) {
              setProgress({ current: ev.current, total: ev.total });
            } else if (ev.type === "summary") {
              setSummary({ ok: ev.ok ?? 0, skip: ev.skip ?? 0, fail: ev.fail ?? 0 });
            } else if (ev.type === "error" && ev.message) {
              appendLog(`❌ ${ev.message}`);
            } else if (ev.type === "done") {
              appendLog(`✅ ${ev.message ?? "同步完成"}`);
            }
          } catch {}
        }
      }
    } catch (e) {
      appendLog(`❌ ${(e as Error).message}`);
    } finally {
      setSyncing(false);
    }
  };

  const pct = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initTokenClient}
      />
      <div className="space-y-8 max-w-4xl">
        <header>
          <h1 className="font-display text-3xl text-ink-950 mb-2">庫存同步</h1>
          <p className="text-sm text-ink-500">
            從 Google Drive 資料夾同步商品資料到金閃閃網站。員工自己登入 Google + 貼資料夾連結 + 按同步。
          </p>
        </header>

        {!googleClientId && (
          <div className="bg-red-50 border border-red-200 p-4 text-sm text-red-900">
            ⚠️ 尚未設定 Google OAuth Client ID。請聯絡管理員到 Vercel 加 `NEXT_PUBLIC_GOOGLE_CLIENT_ID` env。
          </div>
        )}

        {/* Step 1: Google 登入 */}
        <section className="bg-white border border-ink-950/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm tracking-[0.3em] uppercase text-gold-600 mb-1">
                Step 1
              </p>
              <p className="text-lg font-medium">登入 Google 帳號</p>
              <p className="text-xs text-ink-500 mt-1">
                帳號必須對「來源 Drive 資料夾」有讀取權限。
              </p>
            </div>
            {accessToken ? (
              <div className="text-right">
                <p className="text-sm text-emerald-700">✓ 已登入</p>
                <p className="text-xs text-ink-500">{userEmail}</p>
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-xs text-ink-400 hover:text-red-600 mt-1"
                >
                  登出
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                disabled={!googleClientId}
                className="bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-6 py-3 text-sm tracking-wider transition-colors disabled:bg-ink-300 disabled:cursor-not-allowed"
              >
                用 Google 登入
              </button>
            )}
          </div>
        </section>

        {/* Step 2: 貼資料夾連結 */}
        <section className="bg-white border border-ink-950/10 p-6 space-y-4">
          <div>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-gold-600 mb-1">
              Step 2
            </p>
            <p className="text-lg font-medium">貼 Google Drive 資料夾連結</p>
            <p className="text-xs text-ink-500 mt-1">
              在 Drive 點資料夾右上「分享」→ 把上面登入的 Google 帳號加為「檢視者」,然後複製資料夾連結貼下面。
            </p>
          </div>
          <input
            type="url"
            value={folderUrl}
            onChange={(e) => setFolderUrl(e.target.value)}
            placeholder="https://drive.google.com/drive/folders/..."
            className="w-full bg-ivory-50 border border-ink-950/15 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 font-mono"
            disabled={syncing}
          />
        </section>

        {/* Step 3: 開始同步 */}
        <section className="bg-white border border-ink-950/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm tracking-[0.3em] uppercase text-gold-600 mb-1">
                Step 3
              </p>
              <p className="text-lg font-medium">開始同步</p>
            </div>
            <button
              type="button"
              onClick={onSync}
              disabled={!accessToken || !folderUrl.trim() || syncing}
              className="bg-gold-500 hover:bg-gold-600 disabled:bg-ink-300 disabled:cursor-not-allowed text-ink-950 px-8 py-3.5 text-sm tracking-[0.3em] font-display uppercase transition-colors"
            >
              {syncing ? "同步中…" : "開始同步"}
            </button>
          </div>

          {/* 進度條 */}
          {(syncing || progress.total > 0) && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-ink-600">
                <span>進度</span>
                <span>{progress.current} / {progress.total} ({pct}%)</span>
              </div>
              <div className="h-3 bg-ink-950/10 overflow-hidden">
                <div
                  className="h-full bg-gold-500 transition-all duration-300 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}

          {/* 結果摘要 */}
          {(summary.ok + summary.skip + summary.fail) > 0 && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-emerald-50 border border-emerald-200 p-3 text-center">
                <p className="text-2xl font-display text-emerald-700">{summary.ok}</p>
                <p className="text-[10px] tracking-wider text-emerald-600 uppercase">成功</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 text-center">
                <p className="text-2xl font-display text-amber-700">{summary.skip}</p>
                <p className="text-[10px] tracking-wider text-amber-600 uppercase">跳過</p>
              </div>
              <div className="bg-red-50 border border-red-200 p-3 text-center">
                <p className="text-2xl font-display text-red-700">{summary.fail}</p>
                <p className="text-[10px] tracking-wider text-red-600 uppercase">失敗</p>
              </div>
            </div>
          )}

          {/* Log 即時輸出 */}
          {logs.length > 0 && (
            <div
              ref={logRef}
              className="bg-ink-950 text-emerald-300 font-mono text-xs p-4 h-48 overflow-y-auto"
            >
              {logs.map((l, i) => (
                <div key={i} className="leading-relaxed">{l}</div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
