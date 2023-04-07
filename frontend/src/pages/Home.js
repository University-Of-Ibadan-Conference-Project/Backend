import CountDownTimer from "../components/Countdown/Countdown";
import styles from "./../sass/pages/Home.module.scss";
import PropTypes from "prop-types";
import SubTheme from "../components/SubTheme/SubTheme";

import speaker1 from "./../assets/speakers/_3.JPG";
import speaker2 from "./../assets/speakers/_2.PNG";
import speaker3 from "./../assets/speakers/_1.PNG";
import speaker4 from "./../assets/speakers/_4.JPG";
import speaker5 from "./../assets/speakers/_5.JPG";
import speaker6 from "./../assets/speakers/_6.JPG";
import speaker7 from "./../assets/speakers/_7.JPG";

const Home = () => {
  return (
    <>
      <div className={styles.Home}>
        <div className={styles.Hero}>
          <div className={styles.title}>
            <h3>
              THE FACULTY OF SCIENCE, UNIVERSITY OF IBADAN 5TH INTERNATIONAL
              CONFERENCE ON
            </h3>
            <h2 className={styles.Submaintheme}>
              SCIENTIFIC RESEARCH IN NIGERIA
            </h2>
          </div>
          <p className={styles.Hero_year}>2 - 5 MAY, 2023.</p>
          <p className={styles.Hero_line}></p>
          <h6 className={styles.Hero_theme}>
            THEME: Strengthening Scientific Research for National Development
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
            her 5th International Conference on Scientific Research
          </span>
          , scheduled to be held from 2nd - 5th May, 2023 at the Faculty of
          Science Lakeside Lecture Theater, University of Ibadan. The theme for
          this conference is{" "}
          <b>
            &quot;Strengthening Scientific Research for National
            Development&quot;
          </b>
          . The objective of this conference is to promote the international and
          interdisciplinary exchange of scientific information among scientists
          in academia, research institutes, and industries. Highlights of the
          conference will include Keynotes and Plenary Sessions, Technical
          Sessions, Panel Sessions, Exhibition, Women Scientists Session,
          Excursion, Luncheons/Dinners and Awards. It is expected that the
          scientific ideas to be shared at this conference will be found helpful
          to the policy makers towards national development. This invitation is
          open to researchers, policy makers, and individuals with a keen
          interest in how scientific research can be strengthened for national
          development.
        </p>
      </div>

      <div className={styles.HomeInfo}>
        <h2>SPEAKERS</h2>
        <div className={styles.Speakers}>
          <KeynoteSpeaker
            name="Prof. Ekanem Ikpi Braide"
            dp={speaker1}
            status={"FAS"}
            isKeyNoteSpeaker={true}
          />
          <KeynoteSpeaker
            name="Prof. Dahud Kehinde Sangodoyin"
            dp={speaker2}
            isKeyNoteSpeaker={true}
          />
          <br />
          <KeynoteSpeaker
            isKeyNoteSpeaker={false}
            dp={speaker4}
            name="Prof. Dr. Axel Klein"
          />
          <KeynoteSpeaker
            isKeyNoteSpeaker={false}
            dp={speaker5}
            name="Prof. Oluwatoyin A. Odeku"
          />
          <KeynoteSpeaker
            isKeyNoteSpeaker={false}
            dp={speaker6}
            name="Dr. Omololu Akin-Ojo"
          />
          <KeynoteSpeaker
            isKeyNoteSpeaker={false}
            dp={speaker3}
            name="Prof. Ebenezer Olatunde Farombi"
            status={"PhD (Ibadan), FRSC, ATS, FAS, FAAS, FNSBMB, FAMedS"}
          />
          <KeynoteSpeaker
            isKeyNoteSpeaker={false}
            dp={speaker7}
            name="Prof. Johnson Olaleru"
          />
        </div>
      </div>

      {/* Event subtheme */}

      <SubTheme />
    </>
  );
};

const KeynoteSpeaker = ({ dp, name, isKeyNoteSpeaker, status }) => {
  return (
    <div className={styles.Speaker}>
      <img src={dp} alt={name} />
      <a href="https://www.google.com" target={"_blank"} rel="noreferrer">
        <h5>{name}</h5>
        <span style={{ fontWeight: "300" }}>
          <i>{status}</i>
        </span>
        <h6>
          <span>{isKeyNoteSpeaker ? "KEYNOTE" : "PLENARY"} SPEAKER</span>
        </h6>
      </a>
    </div>
  );
};

KeynoteSpeaker.propTypes = {
  isKeyNoteSpeaker: PropTypes.bool,
  name: PropTypes.string,
};

export default Home;
