import React, { useEffect } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";

const submissionRules = [
  { label: "Format", value: "Microsoft Word · Times New Roman 12pt" },
  { label: "Length", value: "Max 350 words (excl. title & author names)" },
  { label: "Keywords", value: "Up to 5 keywords" },
  {
    label: "Title",
    value: "Bold capital letters; followed by author names (surname first)",
  },
  {
    label: "Author details",
    value: "Affiliations, e-mail and phone of the corresponding author",
  },
  { label: "Deadline", value: "28 February 2025" },
];

const presentationModes = [
  {
    label: "Poster Presentation",
    value:
      "Posters should be 100 × 80 cm (vertical). Horizontally long posters cannot be accommodated.",
  },
  {
    label: "Oral Presentation (Hybrid)",
    value: "15 minutes total — 10 minutes for the talk, 5 minutes for Q&A.",
  },
];

const publicationRules = [
  {
    label: "Journal",
    value: "Journal of Science Research (Special Issue)",
  },
  { label: "Manuscript deadline", value: "31 March 2025" },
  { label: "Processing fee", value: "₦40,000" },
  {
    label: "Eligibility",
    value: "Only papers presented at the conference are considered",
  },
];

const pathToAnchor = {
  "/submit-guidelines": "abstract",
  "/presentation-guideline": "presentation",
  "/publication-of-conference-papers": "publication",
};

export default function CallForPapers() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash.replace("#", "") || pathToAnchor[pathname];
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return (
    <>
      <CommonHero
        title="Call for Papers"
        info="Submission, presentation and publication guidelines"
        bg="https://press.sunway.edu.my/sites/default/files/hdr_publish.jpg"
      />

      <nav className="adv-nav" aria-label="Call for Papers sections">
        <div className="adv-nav__inner">
          <NavLink to="/call-for-papers#abstract" className="adv-nav__link">
            Abstract
          </NavLink>
          <NavLink to="/call-for-papers#presentation" className="adv-nav__link">
            Presentation
          </NavLink>
          <NavLink to="/call-for-papers#publication" className="adv-nav__link">
            Publication
          </NavLink>
        </div>
      </nav>

      <section id="abstract" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Abstract</span>
          <h2 className="adv__title">Abstract Submission Guideline</h2>
          <p className="adv__lede">
            All participants are invited to submit abstracts for oral and/or
            poster presentations. The official language of the conference is
            English. All accepted abstracts will be published in the Book of
            Abstracts.
          </p>
        </header>

        <ul className="adv__rates">
          {submissionRules.map((rule, i) => (
            <li key={rule.label}>
              <span className="adv__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="adv__label">{rule.label}</span>
              <span className="adv__amount adv__amount--text">
                {rule.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="adv__cta">
          <p>Ready to submit your abstract?</p>
          <Link to="/submit-abstract">Submit Abstract</Link>
        </div>
      </section>

      <section id="presentation" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Presentation</span>
          <h2 className="adv__title">Presentation Guideline</h2>
          <p className="adv__lede">
            Authors of accepted abstracts will be invited to present in one of
            two formats. Please ensure your presentation meets the requirements
            below.
          </p>
        </header>

        <ul className="adv__rates">
          {presentationModes.map((mode, i) => (
            <li key={mode.label}>
              <span className="adv__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="adv__label">{mode.label}</span>
              <span className="adv__amount adv__amount--text">
                {mode.value}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="publication" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Publication</span>
          <h2 className="adv__title">Publication of Conference Papers</h2>
          <p className="adv__lede">
            Participants who want their papers to appear in the Special Issue of
            the <em>Journal of Science Research</em> should submit a full
            manuscript that follows the journal&apos;s guidelines. Manuscripts
            that do not conform will be rejected. Only papers presented at the
            conference are considered for publication.
          </p>
          <p className="adv__lede">
            The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
          </p>
        </header>

        <ul className="adv__rates">
          {publicationRules.map((rule, i) => (
            <li key={rule.label}>
              <span className="adv__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="adv__label">{rule.label}</span>
              <span className="adv__amount adv__amount--text">
                {rule.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="adv__cta">
          <p>Submit your full manuscript</p>
          <Link to="/submission">Submit Manuscript</Link>
        </div>
      </section>
    </>
  );
}
