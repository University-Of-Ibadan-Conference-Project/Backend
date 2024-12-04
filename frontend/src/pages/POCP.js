import { Link } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";

const POCP = () => {
  return (
    <>
      <CommonHero
        title="Publication of Conference Papers"
        bg="https://a-gassociates.com/wp-content/uploads/2022/07/shutterstock_1196667214.jpg"
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
          Publication of Conference Papers
        </h2>
        Participants that want their papers to appear in the Special issue of
        the JOURNAL OF SCIENCE RESEARCH should submit the full text of the
        manuscript following the Journal&apos;s guidelines{" "}
        <a href="POCP.pdf" style={{ color: "red", textDecoration: "none" }}>
          here{" "}
        </a>
        on or before 30, April, 2025. Manuscripts that do not conform to the
        journal&apos;s guidelines will be rejected. Please note that only the
        papers presented at the conference shall be considered for publication
        after the payment of the Processing Fees of{" "}
        <b
          style={{
            color: "red",
          }}
        >
          N40,000.00
        </b>
        . Submit your full manuscript <Link to="/submission">here</Link>
      </div>
    </>
  );
};

export default POCP;
