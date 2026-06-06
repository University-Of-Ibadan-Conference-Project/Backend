import { useRef } from "react";
import { useModal } from "../hooks/useModal";

interface Props {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Button modifier class for the confirm action, e.g. "btn--approve". */
  confirmClassName?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmClassName = "btn--primary",
  busy,
  onConfirm,
  onCancel,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Focuses Cancel first, traps Tab within the dialog, closes on Escape.
  useModal(dialogRef, { active: open, onClose: onCancel, closeEnabled: !busy });

  if (!open) return null;

  return (
    <div
      className="overlay"
      onClick={() => !busy && onCancel()}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className="dialog__title">
          {title}
        </h2>
        <div className="dialog__body">{message}</div>
        <div className="dialog__actions">
          <button
            type="button"
            className="btn"
            onClick={onCancel}
            disabled={busy}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn ${confirmClassName}`}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
