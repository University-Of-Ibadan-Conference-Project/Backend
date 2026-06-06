import { useMemo, useState } from "react";
import { useParticipants } from "../hooks/useParticipants";
import {
  computeStats,
  EMPTY_FILTERS,
  filterParticipants,
  sortByNewest,
  type Filters,
} from "../lib/filter";
import { updateStatus } from "../services/participants";
import { toCSV, downloadCSV } from "../lib/csv";
import { fullName } from "../lib/format";
import type { Participant, RegistrationStatus } from "../types";
import { StatsBar } from "./StatsBar";
import { Toolbar } from "./Toolbar";
import { RegistrationsTable } from "./RegistrationsTable";
import { DetailDrawer } from "./DetailDrawer";
import { ConfirmDialog } from "./ConfirmDialog";
import { LogoutIcon } from "./icons";

interface PendingAction {
  participant: Participant;
  status: RegistrationStatus;
}

// Copy + confirm-button tone for each status transition.
const STATUS_COPY: Record<
  RegistrationStatus,
  { title: string; confirm: string; cls: string; label: string }
> = {
  approved: {
    title: "Approve registration?",
    confirm: "Approve",
    cls: "btn--approve",
    label: "Approved",
  },
  rejected: {
    title: "Reject registration?",
    confirm: "Reject",
    cls: "btn--reject",
    label: "Rejected",
  },
  pending: {
    title: "Reset to pending?",
    confirm: "Reset",
    cls: "btn--primary",
    label: "Pending",
  },
};

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { participants, loading, error } = useParticipants();

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [updating, setUpdating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const stats = useMemo(() => computeStats(participants), [participants]);
  const visible = useMemo(
    () => filterParticipants(sortByNewest(participants), filters),
    [participants, filters],
  );
  // Derive the selected record from the live list so it reflects edits and
  // disappears if the record is removed from the public form.
  const selected = useMemo(
    () => participants.find((p) => p.id === selectedId) ?? null,
    [participants, selectedId],
  );

  // Approve / reject / reset are confirmed in a modal before they touch
  // Firestore, so a misclick can't silently change a registrant's status.
  function requestStatusChange(p: Participant, status: RegistrationStatus) {
    setPendingAction({ participant: p, status });
  }

  async function confirmStatusChange() {
    if (!pendingAction) return;
    const { participant, status } = pendingAction;
    setUpdating(true);
    setNotice(null);
    try {
      await updateStatus(participant.id, status);
      setPendingAction(null);
    } catch (e) {
      setNotice(`Couldn't update status: ${(e as Error).message}`);
    } finally {
      setUpdating(false);
    }
  }

  function handleExport() {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCSV(`registrations-${stamp}.csv`, toCSV(visible));
  }

  return (
    <div className="app">
      <header className="app__head">
        <div>
          <span className="app__eyebrow">ICFC · Admin</span>
          <h1 className="app__title">Registrations</h1>
        </div>
        <button type="button" className="btn btn--ghost" onClick={onLogout}>
          <LogoutIcon />
          <span>Sign out</span>
        </button>
      </header>

      <StatsBar stats={stats} />

      {notice && (
        <div className="notice notice--error" role="alert">
          {notice}
          <button
            type="button"
            className="notice__close"
            onClick={() => setNotice(null)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <Toolbar
        filters={filters}
        onChange={setFilters}
        shown={visible.length}
        total={participants.length}
        onExport={handleExport}
      />

      {loading ? (
        <p className="state state--loading">Loading registrations…</p>
      ) : error ? (
        <p className="state state--error">
          Couldn't load registrations: {error}
        </p>
      ) : participants.length === 0 ? (
        <p className="state">No registrations yet.</p>
      ) : visible.length === 0 ? (
        <p className="state">No registrations match the current filters.</p>
      ) : (
        <RegistrationsTable
          rows={visible}
          onSelect={(p) => setSelectedId(p.id)}
          onStatusChange={requestStatusChange}
        />
      )}

      <DetailDrawer
        participant={selected}
        paused={pendingAction !== null}
        onClose={() => setSelectedId(null)}
        onStatusChange={requestStatusChange}
      />

      <ConfirmDialog
        open={pendingAction !== null}
        busy={updating}
        title={pendingAction ? STATUS_COPY[pendingAction.status].title : ""}
        confirmLabel={
          pendingAction ? STATUS_COPY[pendingAction.status].confirm : "Confirm"
        }
        confirmClassName={
          pendingAction ? STATUS_COPY[pendingAction.status].cls : "btn--primary"
        }
        message={
          pendingAction ? (
            <>
              Set{" "}
              <strong>
                {fullName(pendingAction.participant) || "this participant"}
              </strong>
              ’s status to{" "}
              <strong>{STATUS_COPY[pendingAction.status].label}</strong>?
            </>
          ) : null
        }
        onConfirm={confirmStatusChange}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
