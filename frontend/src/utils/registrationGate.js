import axios from "axios";
import Swal from "sweetalert2";

const LOGIN_PASSWORD = "uics2025";

/**
 * Prompt for email and verify registration (same flow as submit-abstract).
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
      if (!email?.trim()) {
        return Swal.showValidationMessage("Please enter your email");
      }
      try {
        const response = await axios.post("/accounts/login/", {
          email: email.trim(),
          password: LOGIN_PASSWORD,
        });
        if (response.data === null) {
          return Swal.showValidationMessage(
            "This email is not registered. Please register first.",
          );
        }
        return response.data;
      } catch {
        return Swal.showValidationMessage(
          "This email is not registered. Please register first.",
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
