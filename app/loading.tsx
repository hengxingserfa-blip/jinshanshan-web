export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-6" />
        <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase">
          載入中 Loading
        </p>
      </div>
    </div>
  );
}
