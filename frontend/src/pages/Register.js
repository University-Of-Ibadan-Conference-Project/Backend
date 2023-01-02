import "../sass/components/Form/Form.scss";
import CommonHero from "./../components/CommonHero/CommonHero";
import styles from "./../sass/pages/Accomodation.module.scss";
import RegisterForm from "../components/Register/RegisterForm";

export default function Register() {
  return (
    <div>
      <CommonHero
        title="Register with us."
        bg="https://www.eventpro.net/images/online-event-attendee-registration.jpg"
      />
      <div className={styles.ActivityCard}>
        <p>
          The registration fee covering the cost of conference materials, lunch
          and tea breaks is{" "}
          <b
            style={{
              color: "red",
            }}
          >
            N25, 000.00
          </b>
          . The registration for international paticipant is{" "}
          <b
            style={{
              color: "red",
            }}
          >
            $100
          </b>
          . The registration fee for students who are not academic staff and
          with identity cards is{" "}
          <b
            style={{
              color: "red",
            }}
          >
            N15,000.00
          </b>
          .
        </p>
        <p>
          The registration fee for international student is{" "}
          <b
            style={{
              color: "red",
            }}
          >
            $50
          </b>
          . Please pay the registration fee to the conference account ( Name of
          account: University of Ibadan, Faculty of Science Alumni Association,
          Bank: Union Bank, Account Number: 0109363898) and upload the receipt
          of your payment. Only registered participants and invited guests will
          be allowed into the conference venue.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
