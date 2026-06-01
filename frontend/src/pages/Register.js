import React, { useEffect, useState } from "react";
import "../sass/components/Form/Form.scss";
import CommonHero from "./../components/CommonHero/CommonHero";
import RegisterForm from "../components/Register/RegisterForm";
import RegistrationFeesTable from "../components/RegistrationFeesTable/RegistrationFeesTable";
import styles from "./../sass/pages/Register.module.scss";

const DEADLINE = new Date("2026-07-15T23:59:59");

const bank = [
  { label: "Account Name", value: "UI MicroFinance Bank" },
  { label: "Bank Name", value: "First Bank" },
  { label: "Account Number", value: "2020527642" },
];

const pad = (n) => (n > 9 ? `${n}` : `0${n}`);

// Starts as `undefined` so the server-rendered HTML and the first client
// render are identical (avoids an SSG hydration mismatch from time-based
// output). The live value is only computed after mount.
const useCountdown = (target) => {
  const [remaining, setRemaining] = useState(undefined);

  useEffect(() => {
    const compute = () => {
      const diff = +target - +new Date();
      if (diff <= 0) return null;
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: pad(Math.floor((diff / (1000 * 60)) % 60)),
        seconds: pad(Math.floor((diff / 1000) % 60)),
      };
    };
    setRemaining(compute());
    const id = setInterval(() => setRemaining(compute()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
};

export default function Register() {
  const remaining = useCountdown(DEADLINE);
  const isClosed = remaining === null;

  return (
    <>
      <CommonHero
        title="Register"
        info="Secure your seat at the International Conference of the Faculty of Computing (ICFC)"
        bg="https://www.eventpro.net/images/online-event-attendee-registration.jpg"
      />

      <section className={styles.Page}>
        <header className={styles.Head}>
          <span className={styles.Eyebrow}>Registration</span>
          <h2 className={styles.Title}>Reserve your place</h2>
          <p className={styles.Lede}>
            Registration covers conference materials, lunch and tea breaks. Only
            registered participants and invited guests will be admitted to the
            venue.
          </p>
        </header>

        <div
          className={`${styles.Deadline} ${isClosed ? styles.DeadlineClosed : ""}`}
        >
          <div className={styles.DeadlineMeta}>
            <span className={styles.DeadlineLabel}>
              {isClosed ? "Registration closed" : "Registration closes in"}
            </span>
            <span className={styles.DeadlineDate}>15 July 2026</span>
          </div>
          {!isClosed && remaining && (
            <div className={styles.Countdown}>
              <CountUnit value={remaining.days} label="days" />
              <span className={styles.CountSep}>:</span>
              <CountUnit value={remaining.hours} label="hours" />
              <span className={styles.CountSep}>:</span>
              <CountUnit value={remaining.minutes} label="min" />
              <span className={styles.CountSep}>:</span>
              <CountUnit value={remaining.seconds} label="sec" />
            </div>
          )}
        </div>

        <h3 className={styles.SubTitle}>Registration Fees</h3>
        <RegistrationFeesTable />

        <h3 className={styles.SubTitle}>Payment Details</h3>
        <dl className={styles.Bank}>
          {bank.map((row) => (
            <div key={row.label} className={styles.BankRow}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.BankNote}>
          Please pay the registration fee to the conference account above and
          upload the receipt of your payment in the form below.
        </p>
      </section>

      {!isClosed && (
        <section className={styles.FormSection}>
          <header className={styles.Head}>
            <span className={styles.Eyebrow}>Form</span>
            <h2 className={styles.Title}>Your details</h2>
            <p className={styles.Lede}>
              Fill out the form below and attach proof of payment. You will
              receive a confirmation email once your registration is verified.
            </p>
          </header>
          <RegisterForm />
        </section>
      )}
    </>
  );
}

const CountUnit = ({ value, label }) => (
  <div className={styles.CountUnit}>
    <span className={styles.CountValue}>{value}</span>
    <span className={styles.CountLabel}>{label}</span>
  </div>
);
