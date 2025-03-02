import { useState, useEffect } from "react";
import "../sass/components/Form/Form.scss";
import CommonHero from "./../components/CommonHero/CommonHero";
import styles from "./../sass/pages/Accomodation.module.scss";
import RegisterForm from "../components/Register/RegisterForm";
import { Link } from "react-router-dom";

export default function Register() {
  const [countdown, setCountdown] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1, 0); // Last day of the current month
    deadline.setHours(23, 59, 59, 999);

    const updateCountdown = () => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        setIsClosed(true);
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
        {isClosed ? (
          <h1 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
            Registration is closed.
          </h1>
        ) : (
          <>
            <p>
              The registration deadline is <b style={{ color: "red" }}>31st of March 2025</b>.
            </p>
            <p>
              Countdown to deadline: <b style={{ color: "blue" }}>{countdown}</b>
            </p>
            <p>
              The registration fee covering the cost of conference materials, lunch
              and tea breaks is{" "}
              <b style={{ color: "red" }}>N40,000.00</b>. The registration for international participant is{" "}
              <b style={{ color: "red" }}>$100</b>. The registration fee for students who are not academic staff and
              with identity cards is <b style={{ color: "red" }}>N20,000.00</b>.
            </p>
            <p>
              The registration fee for international student is <b style={{ color: "red" }}>$50</b>. Please pay the registration fee to the conference account
              ( Name of account: University of Ibadan, Faculty of Science Alumni Association,
              Bank: Union Bank, Account Number: 0109363898) and upload the receipt
              of your payment. Only registered participants and invited guests will
              be allowed into the conference venue.
            </p>
          </>
        )}
      </div>
      {!isClosed && <RegisterForm />}
    </div>
  );
}
