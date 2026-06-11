import Swal from "sweetalert2";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Look up a registered participant by email in Firestore.
 * Registration emails are stored as typed, so we try the value as entered and
 * then its lowercase form to stay tolerant of casing differences.
 * Returns the participant record (with its doc id) or null if none match.
 */
async function findParticipantByEmail(email) {
  const participantsRef = collection(db, "participants");
  const lower = email.toLowerCase();
  const candidates = lower === email ? [email] : [email, lower];

  for (const value of candidates) {
    const snapshot = await getDocs(
      query(participantsRef, where("email", "==", value), limit(1)),
    );
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
  }

  return null;
}

/**
 * Prompt for email and verify registration against Firebase (the backend that
 * previously handled this has been retired).
 * Returns user object on success; null if cancelled or not registered.
 */
export async function promptRegistrationEmail() {
  const result = await Swal.fire({
    title: "Confirm registration",
    input: "email",
    inputLabel: "Enter your registered email to continue",
    html: `<span>Kindly enter your email to confirm that you are registered for the conference.</span>`,
    icon: "info",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
    showDenyButton: true,
    denyButtonText: "Not registered",
    confirmButtonText: "Continue",
    showLoaderOnConfirm: true,
    preConfirm: async (email) => {
      const trimmed = email?.trim();
      if (!trimmed) {
        return Swal.showValidationMessage("Please enter your email");
      }
      try {
        const participant = await findParticipantByEmail(trimmed);
        if (!participant) {
          return Swal.showValidationMessage(
            "This email is not registered. Please register first.",
          );
        }
        return participant;
      } catch (error) {
        console.error("Registration lookup failed", error);
        return Swal.showValidationMessage(
          "We couldn't verify your registration right now. Please try again.",
        );
      }
    },
    allowEscapeKey: false,
    allowOutsideClick: false,
  });

  if (result.isDenied) {
    window.location.href = "/register";
    return null;
  }

  if (result.isConfirmed && result.value) {
    localStorage.setItem("user", JSON.stringify(result.value));
    return result.value;
  }

  return null;
}

/** Open external URL in a new tab after registration check. */
export async function openGatedExternalLink(url) {
  const user = await promptRegistrationEmail();
  if (user) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
