import { useState } from "react";
import { LockIcon } from "./icons";

interface Props {
  configured: boolean;
  onLogin: (passcode: string) => boolean;
}

export function Login({ configured, onLogin }: Props) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(passcode)) {
      setError(true);
      setPasscode("");
    }
  };

  return (
    <main className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <span className="login__index">01 ——</span>
        <span className="login__icon" aria-hidden="true">
          <LockIcon width={22} height={22} />
        </span>
        <h1 className="login__title">Registrations Admin</h1>
        <p className="login__sub">
          Enter the admin passcode to manage conference registrations.
        </p>

        {configured ? (
          <>
            <label className="login__label" htmlFor="passcode">
              Passcode
            </label>
            <input
              id="passcode"
              type="password"
              className={`login__input ${error ? "is-error" : ""}`}
              value={passcode}
              autoFocus
              autoComplete="current-password"
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
            />
            {error && (
              <span role="alert" className="login__error">
                Incorrect passcode. Try again.
              </span>
            )}
            <button type="submit" className="btn btn--primary login__submit">
              Unlock dashboard
            </button>
          </>
        ) : (
          <div className="login__notice">
            <strong>Passcode not configured.</strong>
            <p>
              Create <code>admin-manager/.env.local</code> with
              <code>VITE_ADMIN_PASSCODE=your-passcode</code> and restart the dev
              server.
            </p>
          </div>
        )}
      </form>
    </main>
  );
}
