import type { Participant } from "../types";

/** "First Other Last", collapsing any blank parts. */
export function fullName(p: Participant): string {
  return [p.first_name, p.other_names, p.last_name]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");
}

/** Initials for the avatar tile, e.g. "JD". */
export function initials(p: Participant): string {
  const first = p.first_name?.trim()?.[0] ?? "";
  const last = p.last_name?.trim()?.[0] ?? "";
  return (first + last).toUpperCase() || "?";
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(date: Date | null): string {
  return date ? dateFmt.format(date) : "—";
}

export function formatDateTime(date: Date | null): string {
  return date ? dateTimeFmt.format(date) : "—";
}

/** Pad a row index to a fixed-width editorial line number, e.g. 7 -> "007". */
export function lineNumber(index: number, width = 3): string {
  return String(index + 1).padStart(width, "0");
}
