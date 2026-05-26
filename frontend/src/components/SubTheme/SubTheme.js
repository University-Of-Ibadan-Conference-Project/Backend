import React from "react";
import ai from "./../../assets/conference pictures/ai.jpeg";
import engineering from "./../../assets/conference pictures/nanotech.jpg";
import security from "./../../assets/conference pictures/science-security.jpg";
import quantum from "./../../assets/conference pictures/math-modelling.jpg";
import network from "./../../assets/conference pictures/information-technology.webp";
import software from "./../../assets/conference pictures/aicult.jpeg";

import "./SubTheme.css";

const SubTheme = () => {
  const themes = [
    {
      id: 6,
      title: "Software Engineering and Systems",
      topics: [
        "Software Analysis and Design",
        "Software Engineering of Mobile Applications",
      ],
      backgroundImage: software,
    },
    {
      id: 1,
      title: "AI and Data Science",
      topics: [
        "Computer Vision",
        "Natural Language Processing",
        "Big Data Analytics",
      ],
      backgroundImage: ai,
    },
    {
      id: 4,
      title: "Quantum Computing",
      topics: [
        "Quantum Information Science",
        "Quantum Algorithms",
        "Quantum Machine Learning",
      ],
      backgroundImage: quantum,
    },
    {
      id: 3,
      title: "Security, Privacy and Trust",
      topics: [
        "Cybersecurity",
        "Blockchain and Distributed Ledger",
        "Zero Trust Architecture",
        "Trustworthy Artificial Intelligence",
      ],
      backgroundImage: security,
    },
    {
      id: 5,
      title: "Network and Communications",
      topics: [
        "5G/6G & Future Networks",
        "Edge and Fog Computing",
        "Network Protocols",
        "IoT",
        "Embedded Systems",
      ],
      backgroundImage: network,
    },
    {
      id: 2,
      title: "Computing in Engineering",
      topics: [
        "Mechatronics",
        "Civil/Environmental",
        "Aerospace",
        "Electrical/Electronics",
        "Petrochemical",
        "Food/Agri",
      ],
      backgroundImage: engineering,
    },
  ];

  return (
    <section className="sub-theme">
      <header className="sub-theme__header">
        <span className="sub-theme__eyebrow">Conference Tracks</span>
        <h2>Thematic Areas</h2>
        <p>
          Six focus areas spanning the frontiers of computing for sustainable
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
