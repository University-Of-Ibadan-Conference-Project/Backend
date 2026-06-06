import type { Participant, RegistrationStatus } from "../types";
import { fullName, formatDate, lineNumber } from "../lib/format";
import { StatusBadge } from "./StatusBadge";
import { StatusActions } from "./StatusActions";

interface Props {
  rows: Participant[];
  onSelect: (p: Participant) => void;
  onStatusChange: (p: Participant, status: RegistrationStatus) => void;
}

export function RegistrationsTable({ rows, onSelect, onStatusChange }: Props) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th className="col-idx">#</th>
            <th>Participant</th>
            <th>Type</th>
            <th>Institution</th>
            <th>Registered</th>
            <th>Status</th>
            <th className="col-actions">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr
              key={p.id}
              className="row"
              onClick={() => onSelect(p)}
              tabIndex={0}
              aria-label={`View details for ${fullName(p) || p.email || "participant"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(p);
                }
              }}
            >
              <td className="col-idx">{lineNumber(i)}</td>
              <td className="cell-primary">{fullName(p) || "—"}</td>
              <td>{p.participant_type || "—"}</td>
              <td>{p.affiliate_institution || "—"}</td>
              <td className="cell-mono">{formatDate(p.createdAt)}</td>
              <td>
                <StatusBadge status={p.registrationStatus} />
              </td>
              <td className="col-actions" onClick={(e) => e.stopPropagation()}>
                <StatusActions
                  status={p.registrationStatus}
                  size="sm"
                  iconOnly
                  onChange={(status) => onStatusChange(p, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
