import React from "react";
import ai from "./../../assets/conference pictures/ai.jpeg";
import security from "./../../assets/conference pictures/science-security.jpg";
import software from "./../../assets/conference pictures/aicult.jpeg";
import data from "./../../assets/conference pictures/math-modelling.jpg";

import "./SubTheme.css";

const SubTheme = () => {
  const themes = [
    {
      id: 1,
      title: "Track 1: ICT & Cybersecurity",
      topics: [
        "Cybersecurity & Digital Trust",
        "Cloud Security & Zero Trust Architecture",
      ],
      backgroundImage: security,
    },
    {
      id: 2,
      title: "Track 2: Data Science",
      topics: [
        "Big Data Engineering, Cloud Analytics & Predictive Systems",
        "Explainable AI, Data Storytelling & Responsible Intelligence",
        "Bioinformatics & Health Informatics",
      ],
      backgroundImage: data,
    },
    {
      id: 3,
      title: "Track 3: Software Engineering",
      topics: [
        "AI-Powered Software Development & Intelligent Engineering Systems",
        "Software Engineering Intelligence & Data Driven Development",
      ],
      backgroundImage: software,
    },
    {
      id: 4,
      title: "Track 4: Computer Science & AI",
      topics: [
        "Machine Learning & Deep Learning Applications",
        "Natural Language Processing & Conversational AI",
        "Explainable AI & Responsible AI",
      ],
      backgroundImage: ai,
    },
  ];

  return (
    <section className="sub-theme">
      <header className="sub-theme__header">
        <span className="sub-theme__eyebrow">Conference Tracks</span>
        <h2>Thematic Areas</h2>
        <p>
          Four focus areas spanning the frontiers of computing for sustainable
          development.
        </p>
      </header>

      <div className="events">
        {themes.map((theme, idx) => (
          <article key={theme.id} className="event-card">
            <div className="event-card__media">
              <img src={theme.backgroundImage} alt="" />
            </div>
            <div className="event-card__body">
              <div className="event-card__indexRow">
                <span className="event-card__index">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="event-card__rule" aria-hidden="true"></span>
              </div>
              <h3>{theme.title}</h3>
              <ul className="event-card__topics">
                {theme.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SubTheme;
