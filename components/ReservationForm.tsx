"use client";

import { useMemo, useState } from "react";

const LINE_OA = process.env.NEXT_PUBLIC_LINE_OA_ID || "452rajhx";

const SERVICES = [
  "舊金換新",
  "舊金回收",
  "飾金換購",
  "修飾販售",
  "訂製金飾 / 對戒",
  "其他諮詢",
];

const TIME_SLOTS = [
  "10:30", "11:00", "11:30", "12:00",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
];

const LANGS = [
  "中文",
  "Tiếng Việt 越南文",
  "Bahasa Indonesia 印尼文",
  "Filipino 菲律賓文",
  "ภาษาไทย 泰文",
  "English",
];

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function plus14ISO() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [lang, setLang] = useState(LANGS[0]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const ready = useMemo(
    () =>
      name.trim().length > 0 &&
      phone.trim().length >= 8 &&
      date &&
      time &&
      service,
    [name, phone, date, time, service]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    const record = {
      name,
      phone,
      date,
      time,
      service,
      lang,
      notes,
      submittedAt: new Date().toISOString(),
    };
    try {
      const list = JSON.parse(
        localStorage.getItem("jinshanshan-reservations") || "[]"
      );
      list.push(record);
      localStorage.setItem("jinshanshan-reservations", JSON.stringify(list));
    } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    const summary = `【金閃閃銀樓 預約】\n姓名:${name}\n電話:${phone}\n日期:${date} ${time}\n服務:${service}\n語言:${lang}${notes ? `\n備註:${notes}` : ""}`;
    const lineUrl = `https://line.me/R/oaMessage/@${LINE_OA}/?${encodeURIComponent(summary)}`;
    const copyText = () => {
      navigator.clipboard?.writeText(summary).then(
        () => setCopied(true),
        () => setCopied(false)
      );
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="bg-ivory-50 border border-gold-200 p-10 md:p-14 text-center">
        <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] uppercase mb-6">
          Reserved · 預約資料已準備好
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-ink-950 mb-6">
          請選一個方式通知店家
        </h3>
        <div className="w-12 gold-line h-px mx-auto mb-8" />
        <div className="max-w-md mx-auto text-left bg-white border border-ink-950/8 p-6 mb-8">
          <dl className="space-y-3 text-sm">
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <dt className="text-ink-400 font-display text-[10px] tracking-widest uppercase pt-0.5">姓名</dt>
              <dd className="text-ink-950">{name}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <dt className="text-ink-400 font-display text-[10px] tracking-widest uppercase pt-0.5">電話</dt>
              <dd className="text-ink-950">{phone}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <dt className="text-ink-400 font-display text-[10px] tracking-widest uppercase pt-0.5">時間</dt>
              <dd className="text-ink-950">{date} · {time}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <dt className="text-ink-400 font-display text-[10px] tracking-widest uppercase pt-0.5">服務</dt>
              <dd className="text-ink-950">{service}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <dt className="text-ink-400 font-display text-[10px] tracking-widest uppercase pt-0.5">語言</dt>
              <dd className="text-ink-950">{lang}</dd>
            </div>
          </dl>
        </div>

        <div className="max-w-md mx-auto flex flex-col gap-3 mb-8">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between bg-[#06C755] text-white hover:opacity-90 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-opacity"
          >
            <span>用 LINE 通知店家</span>
            <span>→</span>
          </a>
          <a
            href="tel:+88632805908"
            className="inline-flex items-center justify-between bg-ink-950 text-ivory-50 hover:bg-gold-500 hover:text-ink-950 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
          >
            <span>直接撥打 (03) 280-5908</span>
            <span>→</span>
          </a>
          <button
            type="button"
            onClick={copyText}
            className="inline-flex items-center justify-between border border-ink-950/30 text-ink-950 hover:border-gold-500 hover:text-gold-600 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
          >
            <span>{copied ? "已複製!" : "複製預約內容"}</span>
            <span>{copied ? "✓" : "⧉"}</span>
          </button>
        </div>

        <p className="text-[10px] tracking-wider text-ink-400 font-display max-w-md mx-auto leading-loose">
          ※ 為了保護您的隱私,本網站不會把資料寄到伺服器<br />
          請主動透過上方任一方式聯絡店家,我們將於營業時段內回覆
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-ivory-50 border border-ink-950/8 p-8 md:p-12"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <Field label="姓名 Name" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="王小姐"
            className="w-full bg-transparent border-b border-ink-950/20 focus:border-gold-500 focus:outline-none py-2 text-ink-950"
            required
          />
        </Field>

        <Field label="電話 Phone" required>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0912 345 678"
            className="w-full bg-transparent border-b border-ink-950/20 focus:border-gold-500 focus:outline-none py-2 text-ink-950"
            required
          />
        </Field>

        <Field label="日期 Date" required>
          <input
            type="date"
            min={todayISO()}
            max={plus14ISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent border-b border-ink-950/20 focus:border-gold-500 focus:outline-none py-2 text-ink-950"
            required
          />
        </Field>

        <Field label="時段 Time" required>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-transparent border-b border-ink-950/20 focus:border-gold-500 focus:outline-none py-2 text-ink-950"
            required
          >
            <option value="">請選擇時段</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="服務項目 Service" required>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-transparent border-b border-ink-950/20 focus:border-gold-500 focus:outline-none py-2 text-ink-950"
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="主要溝通語言 Language">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full bg-transparent border-b border-ink-950/20 focus:border-gold-500 focus:outline-none py-2 text-ink-950"
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8">
        <Field label="想先讓我們知道的事 (選填) Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="例如:想看訂婚對戒、想知道我家舊金大概值多少..."
            rows={3}
            className="w-full bg-transparent border border-ink-950/15 focus:border-gold-500 focus:outline-none p-3 text-ink-950 text-sm"
          />
        </Field>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[10px] tracking-wider text-ink-400 font-display max-w-sm">
          ※ 送出後我們將於門市時段內確認.資料僅作預約用途
        </p>
        <button
          type="submit"
          disabled={!ready}
          className="inline-flex items-center gap-3 bg-ink-950 disabled:bg-ink-700 disabled:cursor-not-allowed hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-8 py-4 font-display tracking-[0.35em] text-xs uppercase transition-colors"
        >
          <span>送出預約 · Reserve</span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block font-display tracking-[0.35em] text-[10px] text-gold-700 uppercase mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
