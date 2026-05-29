import React, { useState, useEffect } from "react";
import "../sass/components/Form/Form.scss";
import CommonHero from "./../components/CommonHero/CommonHero";
import styles from "./../sass/pages/Accomodation.module.scss";
import EventRegisterForm from "../components/Register/EventRegisterForm";
import RegistrationFeesTable from "../components/RegistrationFeesTable/RegistrationFeesTable";

export default function Register() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1, 0); // Last day of the current month
    deadline.setHours(23, 59, 59, 999);

    const updateCountdown = () => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        setCountdown("Registration is closed.");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <CommonHero
        title="Register with us."
        bg="https://www.eventpro.net/images/online-event-attendee-registration.jpg"
      />
      <div className={styles.ActivityCard}>
        <p>
          The registration deadline is{" "}
          <b style={{ color: "red" }}>31st of this month</b>.
        </p>
        <p>
          Countdown to deadline: <b style={{ color: "blue" }}>{countdown}</b>
        </p>
        <RegistrationFeesTable />
        <p>
          Registration covers conference materials, lunch and tea breaks.
        </p>
        <p>
          Please pay the registration fee to the conference account (Account
          Name: UI MicroFinance Bank, Bank Name: First Bank, Account Number:
          2020527642) and upload the receipt of your payment. Only
          registered participants and invited guests will be allowed into the
          conference venue.
        </p>
      </div>
      <EventRegisterForm />
    </div>
  );
}
