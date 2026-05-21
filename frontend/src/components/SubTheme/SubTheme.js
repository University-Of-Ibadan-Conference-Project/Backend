import React from "react";
import climate from "./../../assets/conference pictures/climate.jpeg";
import ai from "./../../assets/conference pictures/ai.jpeg";
import biodiversity from "./../../assets/conference pictures/biodiversity.jpeg";
import indigenous from "./../../assets/conference pictures/indigenous.jpeg";
import mineral from "./../../assets/conference pictures/mineral.jpeg";
import biomed from "./../../assets/conference pictures/biomed.jpeg";
import maths from "./../../assets/conference pictures/maths.jpeg";
import aicult from "./../../assets/conference pictures/aicult.jpeg";

import "./SubTheme.css";

const SubTheme = () => {
  const events = [
    {
      id: 1,
      title: "Climate change, energy transition and global peace",
      backgroundImage: climate,
    },
    {
      id: 2,
      title: "Artificial intelligence, robotics and digital technology",
      backgroundImage: ai,
    },
    {
      id: 3,
      title:
        "Biotechnology, biodiversity, tourism and environmental conservation",
      backgroundImage: biodiversity,
    },
    {
      id: 4,
      title: "Indigenous knowledge and conservation in the era of innovations",
      backgroundImage: indigenous,
    },
    {
      id: 5,
      title:
        "Critical minerals, exploration and exploitation for green and blue economics",
      backgroundImage: mineral,
    },
    {
      id: 6,
      title: "Frontiers in chemical, biomedical and molecular sciences",
      backgroundImage: biomed,
    },
    {
      id: 7,
      title:
        "Mathematical sciences in research, innovation and partnership for the 21st century",
      backgroundImage: maths,
    },
    {
      id: 8,
      title: "Culture change and artificial intelligence",
      backgroundImage: aicult,
    },
  ];

  return (
    <section className="sub-theme">
      <header className="sub-theme__header">
        <span className="sub-theme__eyebrow">Conference Tracks</span>
        <h2>Sub-Themes</h2>
        <p>
          Eight focus areas spanning the frontiers of contemporary scientific
          research, innovation and partnership.
        </p>
      </header>

      <div className="events">
        {events.map((event, idx) => (
          <article key={event.id} className="event-card">
            <div className="event-card__media">
              <img src={event.backgroundImage} alt="" />
            </div>
            <div className="event-card__body">
              <div className="event-card__indexRow">
                <span className="event-card__index">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="event-card__rule" aria-hidden="true"></span>
              </div>
              <h3>{event.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SubTheme;
