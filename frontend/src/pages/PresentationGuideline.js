import CommonHero from "../components/CommonHero/CommonHero";

const PresentationGuidline = () => {
  return (
    <>
      <CommonHero
        title="Presentation Guideline"
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
          GUIDELINES FOR PRESENTATION
        </h2>
        <b><i>Posters presentation:</i></b> <br />
        Posters should be 100 x 80cm. Please note that horizontally long posters will not be accommodated due to space.

        <br />
        
        <b><i>Oral presentation (Hybrid- Virtual/physical):</i></b><br />

          A total of 15 minutes is allowed (10 minutes for presentation and 5 minutes for questions and answers). 
      </div>
    </>
  );
};

export default PresentationGuidline;
