import { Link } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";

const Exhibition = () => {
  return (
    <>
      <CommonHero
        title="Exhibition"
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
        <h2 style={{ textAlign: "center", margin: "2em 0" }}>EXHIBITION</h2>
        The organising committee invites organizations, industries, NGOs and
        individuals to exhibit their products and services at the conference.
        Exhibition stands will be made available at the conference venue.
        Interested participants should{" "}
        <a href="mailto:email@example.com">
          contact the Local Organising Committee (LOC) Secretary
        </a>{" "}
        on or before 5 April, 2023 and upload the evidence of the payment of the
        exhibition fee of N50, 000.00 per stand{" "}
        <Link to="/submission">here</Link>.
      </div>
    </>
  );
};

export default Exhibition;
