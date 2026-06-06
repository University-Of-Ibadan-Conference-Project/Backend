// Shape of a registration record. Mirrors the document the public
// RegisterForm writes to the Firestore `participants` collection
// (frontend/src/components/Register/RegisterForm.jsx).

export type RegistrationStatus = "pending" | "approved" | "rejected";

export type ParticipantType = "Physical" | "Virtual";

export interface Participant {
  /** Firestore document id (not stored in the document itself). */
  id: string;
  first_name: string;
  last_name: string;
  other_names?: string;
  email: string;
  phone: string;
  participant_type: ParticipantType | string;
  affiliate_institution: string;
  department: string;
  country: string;
  state: string;
  city: string;
  /** Storage download URL for the payment receipt. */
  receiptUrl?: string;
  /** Storage path of the receipt, used for deletion. */
  receiptPath?: string;
  registrationStatus: RegistrationStatus;
  /** Converted from the Firestore server Timestamp; null until the
   *  server stamp resolves on a freshly-created record. */
  createdAt: Date | null;
}

export const ALL_STATUSES: RegistrationStatus[] = [
  "pending",
  "approved",
  "rejected",
];
