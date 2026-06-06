import type { RegistrationStatus } from "../types";
import { CheckIcon, UndoIcon, XIcon } from "./icons";

interface Props {
  status: RegistrationStatus;
  onChange: (status: RegistrationStatus) => void;
  /** "sm" for compact in-table buttons. */
  size?: "sm" | "md";
  /** Icon-only buttons; the label is still exposed via aria-label/title. */
  iconOnly?: boolean;
}

const ACTIONS = [
  { value: "approved", label: "Approve", Icon: CheckIcon, cls: "btn--approve" },
  { value: "rejected", label: "Reject", Icon: XIcon, cls: "btn--reject" },
  { value: "pending", label: "Reset", Icon: UndoIcon, cls: "btn--reset" },
] as const;

/**
 * Contextual status controls: the button for the current status is omitted, so
 * an already-approved record shows only Reject / Reset, etc.
 */
export function StatusActions({ status, onChange, size = "md", iconOnly }: Props) {
  const base = size === "sm" ? "btn btn--icon btn--sm" : "btn btn--icon";

  return (
    <div className="status-actions" role="group" aria-label="Change status">
      {ACTIONS.filter((a) => a.value !== status).map(
        ({ value, label, Icon, cls }) => (
          <button
            key={value}
            type="button"
            className={`${base} ${cls}`}
            onClick={() => onChange(value)}
            title={label}
            aria-label={iconOnly ? label : undefined}
          >
            <Icon />
            {!iconOnly && <span>{label}</span>}
          </button>
        ),
      )}
    </div>
  );
}
