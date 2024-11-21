import CommonHero from "../components/CommonHero/CommonHero";

const SubmissionGuidlines = () => {
  return (
    <>
      <CommonHero
        title="Submission Guideline"
        bg="https://press.sunway.edu.my/sites/default/files/hdr_publish.jpg"
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
          GUIDELINES FOR ABSTRACT SUBMISSION
        </h2>
        All participants are invited to submit abstracts for oral and/or poster
        presentation(s). The official language is English. Abstracts must be in
        <b> Microsoft Word</b> format (Times New Roman, font size 12), not more
        than <b>350 words</b> excluding title and author&apos;s name(s) and a
        maximum of five keywords. The title should be in bold capital letters
        followed by the full name(s) (surname first) and address (s) of
        author(s) including e-mail address and phone number(s) of the
        corresponding author. The deadline for abstract submission is on or
        before 30, April, 2023. All the accepted abstracts will be published
        in the Book of Abstract.
      </div>
    </>
  );
};

export default SubmissionGuidlines;
