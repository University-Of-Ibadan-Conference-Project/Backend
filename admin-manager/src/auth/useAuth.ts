import { useCallback, useState } from "react";

const SESSION_KEY = "admin-manager:authed";

/** The configured passcode, or "" when the env var is unset. */
const PASSCODE = (import.meta.env.VITE_ADMIN_PASSCODE ?? "").trim();

interface Auth {
  /** Whether the current session has unlocked the dashboard. */
  authed: boolean;
  /** Whether VITE_ADMIN_PASSCODE has been configured at all. */
  configured: boolean;
  /** Returns true on a correct passcode. */
  login: (passcode: string) => boolean;
  logout: () => void;
}

function readSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Lightweight gate for an internal tool. This is a deterrent, not real
 * security — the passcode ships in the bundle and anyone could read the
 * collection directly. Enforce genuine access control with Firebase Auth +
 * Firestore security rules before exposing this publicly.
 */
export function useAuth(): Auth {
  const configured = PASSCODE.length > 0;
  const [authed, setAuthed] = useState<boolean>(() => configured && readSession());

  const login = useCallback(
    (passcode: string): boolean => {
      if (!configured || passcode.trim() !== PASSCODE) return false;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* sessionStorage may be unavailable; keep the in-memory session */
      }
      setAuthed(true);
      return true;
    },
    [configured],
  );

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  }, []);

  return { authed, configured, login, logout };
}
