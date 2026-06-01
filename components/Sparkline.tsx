interface Props {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

export default function Sparkline({
  data,
  width = 280,
  height = 70,
  stroke = "#9B782A",
  fill = "#9B782A",
  className = "",
}: Props) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padY = 6;
  const innerH = height - padY * 2;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padY + innerH - ((v - min) / range) * innerH;
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  const areaPath =
    `M0,${height} L${points
      .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" L")} L${width},${height} Z`;

  const lastPoint = points[points.length - 1];

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
    >
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.35" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkFill)" />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={lastPoint[0]}
        cy={lastPoint[1]}
        r="3.5"
        fill={stroke}
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}
