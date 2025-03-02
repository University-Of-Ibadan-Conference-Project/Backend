import { useState } from 'react'; // Add this import for state management
import CountDownTimer from "../components/Countdown/Countdown";
import styles from "./../sass/pages/Home.module.scss";
import PropTypes from "prop-types";
import SubTheme from "../components/SubTheme/SubTheme";

import speaker1 from "./../assets/speakers/_3.JPG";
import speaker2 from "./../assets/speakers/k-2.jpg";
import speaker3 from "./../assets/speakers/_2.JPG";
import speaker4 from "./../assets/speakers/_4.JPG";
import speaker5 from "./../assets/speakers/_5.JPG";
import speaker6 from "./../assets/speakers/_6.JPG";
import speaker7 from "./../assets/speakers/_7.JPG";

// Define the Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalContent} onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Home = () => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(true);

  // Calculate the last day of the current month
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const deadlineDate = lastDayOfMonth.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* Modal pop-up */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Registration Deadline</h2>
        <p>The registration deadline has been extended to {deadlineDate}.</p>
        <a href="/register">Register Now</a>
      </Modal>

      <div className={styles.Home}>
        <div className={styles.Hero}>
          <div className={styles.title}>
            <h3>
              THE FACULTY OF SCIENCE, UNIVERSITY OF IBADAN 6TH INTERNATIONAL
              CONFERENCE ON
            </h3>
            <h2 className={styles.Submaintheme}>
              SCIENTIFIC RESEARCH IN NIGERIA
            </h2>
          </div>
          <p className={styles.Hero_year}>6th - 9th May 2025</p>
          <p className={styles.Hero_line}></p>
          <h6 className={styles.Hero_theme}>
            THEME: Scientific Research, Innovation and Partnership in
            Contemporary World
          </h6>
          <p className={styles.Hero_remarks}>
            The Faculty of Science is pleased to announce her 5th International
            Conference on Scientific Research, to be held at the Faculty of
            Science Lakeside Lecture Theater, University of Ibadan.
          </p>
        </div>
      </div>
      {/* Update existing CountDownTimer to include conference date */}
      <CountDownTimer targetDate={new Date('2025-05-06')} />

      <div className={styles.HomeInfo}>
        <h2>ANNOUNCEMENT</h2>
        <p>
          <span>
            The Faculty of Science, University of Ibadan is pleased to announce
            her 6th International Conference on Scientific Research
          </span>
          , scheduled to be held between 6th and 9th May 2025, at the Faculty of
          Science Lakeside Lecture Theater, University of Ibadan. The theme for
          this conference is{""}
          <b>
            "Scientific Research, Innovation and Partnership in
            Contemporary World"
          </b>
          . The objective of the conference is to promote the international and
          interdisciplinary exchange of scientific information among scientists
          in academia, research institutes, and industries. Highlights of the
          conference will include Keynotes and Plenary Sessions, Technical
          Sessions, Panel Sessions, an Exhibition, Excursion, Luncheons/Dinner,
          and Awards. It is expected that the scientific ideas to be shared at
          this conference will be found useful to the policy makers towards
          national development. This invitation is open to researchers, policy
          makers and individuals with a keen interest in scientific research
          trends and challenges of advancements in technology.
        </p>
      </div>

      <div className={styles.HomeInfo}>
        <h2>SPEAKERS</h2>
        <div className={styles.Speakers}>
          <Speaker
            name="Prof. Christian Happi"
            dp={speaker1}
            speakerType="keynote"
            isKeyNoteSpeaker
          />
          <Speaker
            name="Prof. Moshood Niyi Tijani"
            dp={speaker3}
            speakerType="guest"
            isKeyNoteSpeaker
          />
          <Speaker
            dp={speaker7}
            speakerType="plenary"
            name="Prof. Odunayo Clement Adebooye"
          />
        </div>
        <div className={styles.Speakers}>
          <Speaker dp={speaker4} speakerType="plenary" name="Prof. Olufemi Adebisi Bamiro" />
          <Speaker dp={speaker5} speakerType="plenary" name="Prof. Adenike Osofisan" />
          <Speaker
            dp={speaker6}
            speakerType="plenary"
            name="Prof. Abel Idowu"
          />
        </div>
      </div>

      <SubTheme />
    </>
  );
};

const Speaker = ({ dp, name, speakerType, status }) => {
  return (
    <div className={styles.Speaker}>
      <img src={dp} alt={name} />
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
        target="_blank"
        rel="noreferrer"
      >
        <h5>{name}</h5>
        <span style={{ fontWeight: "300" }}>
          <i>{status}</i>
        </span>
        <h6>
          <span>
            {speakerType === "keynote"
              ? "KEYNOTE SPEAKER"
              : speakerType === "plenary"
              ? "PLENARY SPEAKER"
              : "GUEST SPEAKER"}
          </span>
        </h6>
      </a>
    </div>
  );
};

Speaker.propTypes = {
  dp: PropTypes.string,
  status: PropTypes.string,
  speakerType: PropTypes.oneOf(["keynote", "plenary", "guest"]),
  name: PropTypes.string,
};

export default Home;