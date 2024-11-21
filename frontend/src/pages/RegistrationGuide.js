import { Link } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";

const RegistrationGuide = () => {
  return (
    <>
      <CommonHero
        title="Registration Guideline"
        bg="https://archello.s3.eu-central-1.amazonaws.com/images/2021/03/15/gad----line--studio----shaping-changes----space-exhibition-design-exhibition-centres-archello.1615795401.7628.jpg"
      />
      <div
        style={{
          width: "80%",
          margin: "auto",
          // textAlign: "left",
          textAlign: "justify",
          textJustify: "inter-word",
          lineHeight: "2em",
          padding: "2em 0 4em",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "2em 0" }}>
          Registration Guideline
        </h2>
        <p>
          The registration fee covering the cost of conference materials, lunch
          and tea breaks is N25, 000.00. The registration for international
          paticipant is $100. The registration fee for students who are not
          academic staff and with identity cards is N15,000.00.
        </p>
        <p>
          The registration fee for international student is $50. Please pay the
          registration fee to the conference account ( Name of account:
          University of Ibadan, Faculty of Science Alumni Association, Bank:
          Union Bank, Account Number: 0109363898) and upload the receipt of your
          payment <Link to="/register">here</Link>. Only registered participants
          and invited guests will be allowed into the conference venue.
        </p>
      </div>
    </>
  );
};

export default RegistrationGuide;
