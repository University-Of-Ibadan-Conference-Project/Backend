// Firestore access layer for the `participants` collection.
//
// The dashboard subscribes once and receives live updates; status changes
// write straight back to the same documents the public form created.
import {
  collection,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  type DocumentData,
  type FirestoreError,
} from "firebase/firestore";
import { db } from "../firebase";
import { ALL_STATUSES, type Participant, type RegistrationStatus } from "../types";

const COLLECTION = "participants";

/** Coerce a raw Firestore document into a typed Participant. */
function toParticipant(id: string, data: DocumentData): Participant {
  const raw = data.createdAt;
  const createdAt =
    raw instanceof Timestamp
      ? raw.toDate()
      : // A serverTimestamp() is momentarily null on a just-written doc.
        typeof raw?.toDate === "function"
        ? raw.toDate()
        : null;

  // Guard the union: a stray/legacy status in Firestore falls back to pending
  // rather than leaking an out-of-contract value into the UI.
  const status = data.registrationStatus;
  const registrationStatus: RegistrationStatus = ALL_STATUSES.includes(status)
    ? status
    : "pending";

  return {
    id,
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    other_names: data.other_names ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    participant_type: data.participant_type ?? "",
    affiliate_institution: data.affiliate_institution ?? "",
    department: data.department ?? "",
    country: data.country ?? "",
    state: data.state ?? "",
    city: data.city ?? "",
    receiptUrl: data.receiptUrl ?? "",
    receiptPath: data.receiptPath ?? "",
    registrationStatus,
    createdAt,
  };
}

/**
 * Subscribe to the whole collection. Sorting/filtering is done client-side so
 * the dashboard needs no composite indexes and tolerates records whose
 * server timestamp has not yet resolved. Returns the unsubscribe function.
 */
export function subscribeParticipants(
  onData: (participants: Participant[]) => void,
  onError: (error: FirestoreError) => void,
): () => void {
  return onSnapshot(
    collection(db, COLLECTION),
    (snapshot) => {
      onData(snapshot.docs.map((d) => toParticipant(d.id, d.data())));
    },
    onError,
  );
}

/** Set a registration's status (approve / reject / reset to pending). */
export function updateStatus(
  id: string,
  status: RegistrationStatus,
): Promise<void> {
  return updateDoc(doc(db, COLLECTION, id), { registrationStatus: status });
}
