import React from "react";
import { data } from "../constants";
import PropTypes from "prop-types";

const OrganizerCard = ({ organizer: { image, name, role } }) => {
  return (
    <div className="organizer__card">
      <img src={image} alt="Organizer's Image" className="organizer_image" />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

OrganizerCard.propTypes = {
  organizer: PropTypes.object,
};

const SpeakerCard = ({ speaker: { image, name, about } }) => {
  return (
    <div className="speaker__card">
      <img src={image} alt="Speaker's Image" className="speaker_image" />
      <h3>{name}</h3>
      <p>{about}</p>
    </div>
  );
};

SpeakerCard.propTypes = {
  speaker: PropTypes.object,
};

const About = () => {
  return (
    <div className="app__about">
      <div className="app__about-header app__about-section">
        <h1>INFO</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minima
          error harum, rem vitae autem adipisci, totam sequi exercitationem quod
          commodi quasi dolores. Harum quibusdam architecto reiciendis ipsum,
          dignissimos impedit fugit maiores non voluptas quasi quisquam nesciunt
          id unde porro?
        </p>
      </div>

      <div className="app__about-organizers app__about-section">
        <h1>ORGANIZERS</h1>
        <div className="app__about-organizers_list">
          {data.organizers.map((organizer) => (
            <OrganizerCard key={organizer.id} organizer={organizer} />
          ))}
        </div>
      </div>

      <div className="app__about-speakers app__about-section">
        <h1>SPEAKERS</h1>
        <div className="app__about-speakers_list">
          {data.speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
