import { useEffect, useState } from "react";
import { subscribeParticipants } from "../services/participants";
import type { Participant } from "../types";

interface ParticipantsState {
  participants: Participant[];
  loading: boolean;
  error: string | null;
}

/**
 * Live view of the `participants` collection. Re-renders whenever a record is
 * added, edited (status change) or removed anywhere — including from the
 * public registration form.
 */
export function useParticipants(): ParticipantsState {
  const [state, setState] = useState<ParticipantsState>({
    participants: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = subscribeParticipants(
      (participants) => setState({ participants, loading: false, error: null }),
      (error) =>
        setState({ participants: [], loading: false, error: error.message }),
    );
    return unsubscribe;
  }, []);

  return state;
}
