import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";
import GatedCmtLink from "../components/GatedCmtLink/GatedCmtLink";
import { openGatedExternalLink } from "../utils/registrationGate";

const fullPaperRules = [
  { label: "Maximum file size", value: "100 MB" },
  { label: "Maximum paper length", value: "10 – 12 pages" },
  {
    label: "Spacing",
    value: "Single line spacing (final submissions)",
  },
  {
    label: "Submission portal",
    value: "https://cmt3.research.microsoft.com/ICFCUI2026",
    href: "https://cmt3.research.microsoft.com/ICFCUI2026",
  },
];

const publicationRules = [
  {
    label: "Journal",
    value: "Journal of Computing Research (Special Issue)",
  },
  { label: "Manuscript deadline", value: "6 June 2026" },
  { label: "Processing fee", value: "₦30,000" },
  {
    label: "Eligibility",
    value: "Only papers presented at the conference are considered",
  },
];

const pathToAnchor = {
  "/submit-guidelines": "full-paper",
  "/publication-of-conference-papers": "publication",
  "/presentation-guideline": "full-paper",
};

const CMT_PORTAL_URL = "https://cmt3.research.microsoft.com/ICFCUI2026";
const CMT_AUTHOR_GUIDE_URL =
  "https://cmt3.research.microsoft.com/UserGuide/Author/AuthorHome.html";

const renderRuleValue = (rule) => {
  if (rule.href) {
    return <GatedCmtLink href={rule.href}>{rule.value}</GatedCmtLink>;
  }
  return rule.value;
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
        info="Full paper submission and publication guidelines"
        bg="https://press.sunway.edu.my/sites/default/files/hdr_publish.jpg"
      />

      <nav className="adv-nav" aria-label="Call for Papers sections">
        <div className="adv-nav__inner">
          <NavLink to="/call-for-papers#full-paper" className="adv-nav__link">
            Full Paper Submission
          </NavLink>
          <NavLink to="/call-for-papers#publication" className="adv-nav__link">
            Publication
          </NavLink>
        </div>
      </nav>

      <section id="full-paper" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Full Paper</span>
          <h2 className="adv__title">Full Paper Submission</h2>
          <p className="adv__lede">
            Final full-paper submissions must meet the file size, length, and
            formatting requirements below. All papers must be submitted through
            the official Microsoft CMT portal.
          </p>
          <p className="adv__lede">
            All papers must be submitted via the Microsoft Conference Management
            Toolkit (CMT). If you are new to using Microsoft CMT, please refer to
            the{" "}
            <GatedCmtLink href={CMT_AUTHOR_GUIDE_URL}>CMT Author Guide</GatedCmtLink>{" "}
            for step-by-step instructions.
          </p>
          <p className="adv__lede">
            The Microsoft CMT service was used for managing the peer-reviewing
            process for this conference. This service was provided for free by
            Microsoft and they bore all expenses, including costs for Azure
            cloud services as well as for software development and support.
          </p>
        </header>

        <ul className="adv__rates">
          {fullPaperRules.map((rule, i) => (
            <li key={rule.label}>
              <span className="adv__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="adv__label">{rule.label}</span>
              <span className="adv__amount adv__amount--text">
                {renderRuleValue(rule)}
              </span>
            </li>
          ))}
        </ul>

        <div className="adv__cta">
          <p>Submit your full paper via Microsoft CMT</p>
          <button
            type="button"
            onClick={() => openGatedExternalLink(CMT_PORTAL_URL)}
          >
            Open Submission Portal
          </button>
        </div>
      </section>

      <section id="publication" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Publication</span>
          <h2 className="adv__title">Publication of Conference Papers</h2>
          <p className="adv__lede">
             All accepted and presented papers will be published in the official
  Conference Proceedings of the 1st International Conference of the Faculty
  of Computing (ICFC 2026). The proceedings will serve as the permanent
  scholarly record of the conference. Outstanding papers will be published in the Faculty of Computing Journal.
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
                {renderRuleValue(rule)}
              </span>
            </li>
          ))}
        </ul>

        <div className="adv__cta">
          <p>Submit your full manuscript via Microsoft CMT</p>
          <button
            type="button"
            onClick={() => openGatedExternalLink(CMT_PORTAL_URL)}
          >
            Open Submission Portal
          </button>
        </div>
      </section>
    </>
  );
}
