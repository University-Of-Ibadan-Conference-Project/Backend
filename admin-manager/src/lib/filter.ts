import type { Participant, RegistrationStatus } from "../types";
import { fullName } from "./format";

export type StatusFilter = RegistrationStatus | "all";
export type TypeFilter = "Physical" | "Virtual" | "all";

export interface Filters {
  search: string;
  status: StatusFilter;
  type: TypeFilter;
}

export const EMPTY_FILTERS: Filters = {
  search: "",
  status: "all",
  type: "all",
};

export interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  physical: number;
  virtual: number;
}

export function computeStats(participants: Participant[]): Stats {
  const stats: Stats = {
    total: participants.length,
    pending: 0,
    approved: 0,
    rejected: 0,
    physical: 0,
    virtual: 0,
  };
  for (const p of participants) {
    if (p.registrationStatus === "pending") stats.pending++;
    else if (p.registrationStatus === "approved") stats.approved++;
    else if (p.registrationStatus === "rejected") stats.rejected++;

    if (p.participant_type === "Physical") stats.physical++;
    else if (p.participant_type === "Virtual") stats.virtual++;
  }
  return stats;
}

/** Newest first; records without a resolved timestamp sort to the top. */
export function sortByNewest(participants: Participant[]): Participant[] {
  return [...participants].sort((a, b) => {
    const at = a.createdAt?.getTime() ?? Infinity;
    const bt = b.createdAt?.getTime() ?? Infinity;
    return bt - at;
  });
}

export function filterParticipants(
  participants: Participant[],
  filters: Filters,
): Participant[] {
  const term = filters.search.trim().toLowerCase();

  return participants.filter((p) => {
    if (filters.status !== "all" && p.registrationStatus !== filters.status)
      return false;
    if (filters.type !== "all" && p.participant_type !== filters.type)
      return false;

    if (term) {
      const haystack = [
        fullName(p),
        p.email,
        p.phone,
        p.affiliate_institution,
        p.department,
        p.country,
        p.state,
        p.city,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
}
