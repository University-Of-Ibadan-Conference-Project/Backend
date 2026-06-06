import type { Participant } from "../types";
import { formatDateTime } from "./format";

interface Column {
  header: string;
  value: (p: Participant) => string;
}

const COLUMNS: Column[] = [
  { header: "First name", value: (p) => p.first_name },
  { header: "Last name", value: (p) => p.last_name },
  { header: "Other names", value: (p) => p.other_names ?? "" },
  { header: "Email", value: (p) => p.email },
  { header: "Phone", value: (p) => p.phone },
  { header: "Participant type", value: (p) => p.participant_type },
  { header: "Institution", value: (p) => p.affiliate_institution },
  { header: "Department", value: (p) => p.department },
  { header: "Country", value: (p) => p.country },
  { header: "State", value: (p) => p.state },
  { header: "City", value: (p) => p.city },
  { header: "Status", value: (p) => p.registrationStatus },
  { header: "Registered", value: (p) => formatDateTime(p.createdAt) },
  { header: "Receipt URL", value: (p) => p.receiptUrl ?? "" },
];

/** Quote a single CSV field, escaping embedded quotes per RFC 4180. */
function escapeField(value: string): string {
  const v = value ?? "";
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function toCSV(participants: Participant[]): string {
  const lines = [
    COLUMNS.map((c) => escapeField(c.header)).join(","),
    ...participants.map((p) =>
      COLUMNS.map((c) => escapeField(c.value(p))).join(","),
    ),
  ];
  return lines.join("\r\n");
}

/** Trigger a client-side download of the given CSV text. */
export function downloadCSV(filename: string, csv: string): void {
  // Prefix with a BOM so Excel reads UTF-8 (accented names) correctly.
  const blob = new Blob(["﻿" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
