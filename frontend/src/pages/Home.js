import CountDownTimer from "../components/Countdown/Countdown";
import styles from "./../sass/pages/Home.module.scss";
import PropTypes from "prop-types";
import SubTheme from "../components/SubTheme/SubTheme";
import { Link } from "react-router-dom";

import speaker1 from "./../assets/speakers/_3.JPG";
import speaker3 from "./../assets/speakers/_2.JPG";
import speaker4 from "./../assets/speakers/_4.JPG";
import speaker5 from "./../assets/speakers/_5.JPG";
import speaker6 from "./../assets/speakers/_6.JPG";
import speaker7 from "./../assets/speakers/_7.JPG";

const Home = () => {
  return (
    <>
      <div className={styles.Home}>
        <div className={styles.Hero}>
          <div className={styles.HeroInner}>
            <span className={styles.HeroEyebrow}>
              Faculty of Science · University of Ibadan
            </span>
            <span className={styles.HeroBadge}>
              6<sup>th</sup> International Conference on Scientific Research
            </span>
            <h1 className={styles.HeroTitle}>Scientific Research in Nigeria</h1>
            <p className={styles.HeroTheme}>
              <span className={styles.HeroThemeLabel}>Theme</span>
              Scientific Research, Innovation and Partnership in a Contemporary
              World
            </p>
            <div className={styles.HeroMeta}>
              <span className={styles.HeroMetaItem}>
                <span className={styles.HeroMetaLabel}>Date</span>6 – 9 June
                2026
              </span>
              <span className={styles.HeroMetaDivider} aria-hidden="true" />
              <span className={styles.HeroMetaItem}>
                <span className={styles.HeroMetaLabel}>Venue</span>
                Lakeside Lecture Theater, UI
              </span>
            </div>
            <div className={styles.HeroActions}>
              <Link to="/register" className={styles.HeroCtaPrimary}>
                Register Now
              </Link>
              <Link to="/programme" className={styles.HeroCtaGhost}>
                View Programme
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CountDownTimer targetDate={new Date("2026-06-06")} />

      <section className={styles.Announcement}>
        <header className={styles.AnnouncementHead}>
          <span className={styles.AnnouncementEyebrow}>Announcement</span>
          <h2 className={styles.AnnouncementTitle}>About the Conference</h2>
          <p className={styles.AnnouncementKicker}>
            Faculty of Science · University of Ibadan
            <br />6 – 9 June 2026
          </p>
        </header>

        <div className={styles.AnnouncementBody}>
          <p className={styles.AnnouncementLead}>
            The Faculty of Science, University of Ibadan is pleased to announce
            her 6th International Conference on Scientific Research, scheduled
            to be held between 6th and 9th June 2026, at the Faculty of Science
            Lakeside Lecture Theater, University of Ibadan.
          </p>

          <blockquote className={styles.AnnouncementQuote}>
            <span className={styles.AnnouncementQuoteLabel}>Theme</span>
            Scientific Research, Innovation and Partnership in a Contemporary
            World
          </blockquote>

          <p>
            The objective of the conference is to promote the international and
            interdisciplinary exchange of scientific information among
            scientists in academia, research institutes, and industries.
            Highlights of the conference will include Keynotes and Plenary
            Sessions, Technical Sessions, Panel Sessions, an Exhibition,
            Excursion, Luncheons/Dinner, and Awards.
          </p>

          <p>
            It is expected that the scientific ideas to be shared at this
            conference will be found useful to policy makers towards national
            development. This invitation is open to researchers, policy makers
            and individuals with a keen interest in scientific research trends
            and the challenges of advancements in technology.
          </p>
        </div>
      </section>

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
          <Speaker
            dp={speaker4}
            speakerType="plenary"
            name="Prof. Olufemi Adebisi Bamiro"
          />
          <Speaker
            dp={speaker5}
            speakerType="plenary"
            name="Prof. Adenike Osofisan"
          />
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
  const label =
    speakerType === "keynote"
      ? "Keynote Speaker"
      : speakerType === "plenary"
        ? "Plenary Speaker"
        : "Guest Speaker";

  return (
    <div className={styles.Speaker}>
      <div className={styles.speakerImg}>
        <img src={dp} alt={name} />
      </div>
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
        target="_blank"
        rel="noreferrer"
      >
        <h6>{label}</h6>
        <h5>{name}</h5>
        {status && (
          <span>
            <i>{status}</i>
          </span>
        )}
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
