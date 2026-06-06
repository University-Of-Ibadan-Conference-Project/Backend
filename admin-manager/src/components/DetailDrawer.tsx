import { useRef } from "react";
import type { Participant, RegistrationStatus } from "../types";
import { fullName, formatDateTime, initials, lineNumber } from "../lib/format";
import { useModal } from "../hooks/useModal";
import { StatusBadge } from "./StatusBadge";
import { StatusActions } from "./StatusActions";
import { ReceiptView } from "./ReceiptView";
import { CloseIcon, MailIcon, PhoneIcon } from "./icons";

interface Props {
  participant: Participant | null;
  onClose: () => void;
  onStatusChange: (p: Participant, status: RegistrationStatus) => void;
  /** Suspend focus-trap/Escape while a confirmation dialog is stacked on top. */
  paused?: boolean;
}

export function DetailDrawer({
  participant,
  onClose,
  onStatusChange,
  paused,
}: Props) {
  const drawerRef = useRef<HTMLElement>(null);
  useModal(drawerRef, {
    active: participant !== null && !paused,
    onClose,
  });

  if (!participant) return null;
  const p = participant;

  const fields: { label: string; value: string }[] = [
    { label: "Participant type", value: p.participant_type || "—" },
    { label: "Institution", value: p.affiliate_institution || "—" },
    { label: "Department", value: p.department || "—" },
    { label: "Country", value: p.country || "—" },
    { label: "State / Province", value: p.state || "—" },
    { label: "City", value: p.city || "—" },
    { label: "Registered", value: formatDateTime(p.createdAt) },
    { label: "Record ID", value: p.id },
  ];

  return (
    <div className="overlay overlay--right" role="presentation" onClick={onClose}>
      <aside
        ref={drawerRef}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-name"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="drawer__head">
          <div className="drawer__id">
            <span className="avatar" aria-hidden="true">
              {initials(p)}
            </span>
            <div>
              <h2 id="drawer-name" className="drawer__name">
                {fullName(p) || "Unnamed participant"}
              </h2>
              <StatusBadge status={p.registrationStatus} />
            </div>
          </div>
          <button
            type="button"
            className="btn btn--icon btn--ghost"
            onClick={onClose}
            aria-label="Close details"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="drawer__contacts">
          {p.email && (
            <a className="drawer__contact" href={`mailto:${p.email}`}>
              <MailIcon />
              <span>{p.email}</span>
            </a>
          )}
          {p.phone && (
            <a className="drawer__contact" href={`tel:${p.phone}`}>
              <PhoneIcon />
              <span>{p.phone}</span>
            </a>
          )}
        </div>

        <dl className="detail-list">
          {fields.map((field, i) => (
            <div key={field.label} className="detail-list__row">
              <span className="detail-list__index">{lineNumber(i, 2)}</span>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>

        <section className="drawer__section">
          <h3 className="drawer__section-title">Payment receipt</h3>
          <ReceiptView url={p.receiptUrl} path={p.receiptPath} />
        </section>

        <footer className="drawer__foot">
          <StatusActions
            status={p.registrationStatus}
            onChange={(status) => onStatusChange(p, status)}
          />
        </footer>
      </aside>
    </div>
  );
}
