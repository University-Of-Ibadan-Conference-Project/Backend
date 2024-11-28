import CountDownTimer from "../components/Countdown/Countdown";
import styles from "./../sass/pages/Home.module.scss";
import PropTypes from "prop-types";
import SubTheme from "../components/SubTheme/SubTheme";

import speaker1 from "./../assets/speakers/_3.JPG";
import speaker2 from "./../assets/speakers/k-2.jpg";
import speaker3 from "./../assets/speakers/p-1.JPG";
import speaker4 from "./../assets/speakers/_4.JPG";
import speaker5 from "./../assets/speakers/_5.JPG";
import speaker6 from "./../assets/speakers/_6.JPG";

const Home = () => {
  return (
    <>
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
      <CountDownTimer />

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
            &quot;Scientific Research, Innovation and Partnership in
            Contemporary World&quot;
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
            name="Austin Avuru"
            dp={speaker2}
            speakerType="keynote"
            isKeyNoteSpeaker
          />
          <Speaker
            name="Prof. M. N. Tijani"
            dp={speaker3}
            speakerType="guest"
            isKeyNoteSpeaker
          />
        </div>
        <div className={styles.Speakers}>
          <Speaker dp={speaker4} speakerType="plenary" name="Prof. Bamiro" />
          <Speaker dp={speaker5} speakerType="plenary" name="Prof. Osofisan" />
          <Speaker
            dp={speaker6}
            speakerType="plenary"
            name=" Prof. Abel Idowu"
          />
        </div>
      </div>

      {/* Event subtheme */}

      <SubTheme />
    </>
  );
};

const Speaker = ({ dp, name, speakerType, status }) => {
  return (
    <div className={styles.Speaker}>
      <img src={dp} alt={name} />
      <a href="https://www.google.com" target={"_blank"} rel="noreferrer">
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
  speakerType: "keynote" || "plenary" || "guest",
  name: PropTypes.string,
};

export default Home;
