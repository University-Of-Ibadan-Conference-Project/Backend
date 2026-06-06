import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Options {
  active: boolean;
  onClose: () => void;
  /** When false, Escape won't close (e.g. while a mutation is in flight). */
  closeEnabled?: boolean;
}

/**
 * Modal behaviour for the drawer and dialogs: moves focus inside on open,
 * traps Tab / Shift+Tab within the container, closes on Escape, and restores
 * focus to the trigger on close. Dependency-free so the dashboard pulls in no
 * focus-trap library.
 */
export function useModal(
  containerRef: RefObject<HTMLElement | null>,
  { active, onClose, closeEnabled = true }: Options,
): void {
  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));

    const previouslyFocused = document.activeElement as HTMLElement | null;
    (focusables()[0] ?? el).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (closeEnabled) onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || !el.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !el.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [containerRef, active, onClose, closeEnabled]);
}
