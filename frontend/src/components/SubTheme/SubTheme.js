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
      title: "Climate change, Energy transition and Global peace. ",
      backgroundImage: climate,
    },
    {
      id: 2,
      title: "Artificial Intelligence, Robotics and Digital technology",
      backgroundImage: ai,
    },
    {
      id: 3,
      title:
        "Biotechnology,Biodiversity, tourism and environmental conservation.",
      backgroundImage: biodiversity,
    },
    {
      id: 4,
      title: "Indigenous knowledge and conservation in the era of innovations.",
      backgroundImage: indigenous,
    },
    {
      id: 5,
      title:
        "Critical Minerals, Exploration and Exploitation for Green and Blue economics.",
      backgroundImage: mineral,
    },
    {
      id: 6,
      title: "Frontiers in Chemical,Biomedical and Molecular sciences",
      backgroundImage: biomed,
    },
    {
      id: 7,
      title:
        "The place of Mathematical Science in Research innovation and Partnership in the 21st Century",
      backgroundImage: maths,
    },
    {
      id: 8,
      title: "Culture change and Artificial Intelligence",
      backgroundImage: aicult,
    },
  ];
  return (
    <div className="sub-theme">
      <h2>Sub-Themes</h2>
      <div className="events">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.backgroundImage} className="" />
            <div className="event-container">
              <p>{event.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubTheme;
