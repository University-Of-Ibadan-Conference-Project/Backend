import type { Stats } from "../lib/filter";
import { lineNumber } from "../lib/format";

interface Cell {
  label: string;
  value: number;
  tone?: "pending" | "approved" | "rejected";
}

/**
 * Editorial masthead of figures: each cell carries a fixed-width index number
 * (01–06) and is separated by a hairline rule — numbers and lines, no cards
 * or shadows.
 */
export function StatsBar({ stats }: { stats: Stats }) {
  const cells: Cell[] = [
    { label: "Total", value: stats.total },
    { label: "Pending", value: stats.pending, tone: "pending" },
    { label: "Approved", value: stats.approved, tone: "approved" },
    { label: "Rejected", value: stats.rejected, tone: "rejected" },
    { label: "Physical", value: stats.physical },
    { label: "Virtual", value: stats.virtual },
  ];

  return (
    <dl className="stats">
      {cells.map((cell, i) => (
        <div
          key={cell.label}
          className={`stats__cell ${cell.tone ? `stats__cell--${cell.tone}` : ""}`}
        >
          <span className="stats__index">{lineNumber(i, 2)}</span>
          <dd className="stats__value">{cell.value}</dd>
          <dt className="stats__label">{cell.label}</dt>
        </div>
      ))}
    </dl>
  );
}
