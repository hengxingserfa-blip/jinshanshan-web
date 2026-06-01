"use client";

import { useMemo, useState } from "react";

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
    return (
      <div className="bg-ivory-50 border border-gold-200 p-10 md:p-14 text-center">
        <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] uppercase mb-6">
          Reserved · 預約成功
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-ink-950 mb-6">
          已收到您的預約
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
        <p className="text-sm text-ink-700 leading-loose font-light mb-8">
          我們將於門市營業時間內以電話或 LINE 與您確認。
          <br />
          如有急用,歡迎直接撥打 <a href="tel:+88632805908" className="text-gold-700 underline">(03) 280-5908</a>。
        </p>
        <p className="text-[10px] tracking-wider text-ink-400 font-display max-w-md mx-auto">
          ※ 目前預約資料暫存於您的瀏覽器.後台上線後將自動送達門市
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
