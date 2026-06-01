interface Props {
  className?: string;
}

// 優雅的金色裝飾分隔線:細線 + 金菱形 + 細線
export default function Ornament({ className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="block w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-gold-500" />
      <span className="block w-1.5 h-1.5 rotate-45 bg-gold-500" />
      <span className="block w-12 md:w-20 h-px bg-gradient-to-l from-transparent via-gold-500/50 to-gold-500" />
    </div>
  );
}
