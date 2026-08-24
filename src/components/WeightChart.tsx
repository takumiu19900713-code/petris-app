import type { WeightPoint } from "../types";

const W = 340;
const H = 150;
const P = 26;
const MIN = 1.4;
const MAX = 2.3;

interface Props {
  points: WeightPoint[];
}

export default function WeightChart({ points }: Props) {
  const x = (i: number) => P + (i * (W - 2 * P)) / (points.length - 1);
  const y = (v: number) => H - P - ((v - MIN) * (H - 2 * P)) / (MAX - MIN);

  const path =
    "M" + points.map((p, i) => `${x(i)},${y(p.kg)}`).join(" L");
  const area = `${path} L${x(points.length - 1)},${H - P} L${x(0)},${H - P} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="体重の推移グラフ"
    >
      <defs>
        <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#33604F" stopOpacity=".18" />
          <stop offset="1" stopColor="#33604F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#weightFill)" />
      <path
        d={path}
        fill="none"
        stroke="#33604F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {points.map((p, i) => (
        <circle key={p.label} cx={x(i)} cy={y(p.kg)} r="3.5" fill="#33604F" />
      ))}
      {points.map((p, i) => (
        <text
          key={p.label}
          x={x(i)}
          y={H - 8}
          fontSize="8.5"
          textAnchor="middle"
          fill="#8A817A"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}
