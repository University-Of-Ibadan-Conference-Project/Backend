import React from "react";
import CountDownTimer from "../components/Countdown/Countdown";
import styles from "./../sass/pages/Home.module.scss";
import PropTypes from "prop-types";
import SubTheme from "../components/SubTheme/SubTheme";
import { Link } from "react-router-dom";

const featuredPeople = [
  {
    name: "Professor Olusola Adesina",
    image: "/Keynote.jpg",
    role: "Keynote Speaker",
    description: "Dean of Applied Science, Kola Daisi University",
  },
  {
    name: "Professor Benjamin Aribisala",
    image: "/speak.jpg",
    role: "Speaker",
    description: "Department of Computer Science, Lagos State University",
  },
  {
    name: "Angela Makolo",
    image: "/locc.png",
    role: "LOC Chairman",
    description:
      "Associate Professor, Faculty of Computing, University of Ibadan",
  },
];

const importantDates = [
  { activity: "Call for Papers Opens", date: "May 28, 2026" },
  {
    activity: "Paper Submission Deadline",
    date: "27 June 2026",
    previousDate: "15 June 2026",
  },
  { activity: "Review Period", date: "16 June – July 5, 2026" },
  { activity: "Notification of Acceptance", date: "July 6, 2026" },
  { activity: "Final Corrected Copy Submission", date: "July 10, 2026" },
];

const Home = () => {
  return (
    <>
      <div className={styles.Home}>
        <div className={styles.Hero}>
          <div className={styles.HeroInner}>
            <span className={styles.HeroEyebrow}>
              Faculty of Computing · University of Ibadan
            </span>
            <span className={styles.HeroBadge}>
              International Conference of The Faculty of Computing (ICFC)
            </span>
            <h1 className={styles.HeroTitle}>
              Frontiers in Computing for Sustainable Development
            </h1>
            <div className={styles.HeroMeta}>
              <span className={styles.HeroMetaItem}>
                <span className={styles.HeroMetaLabel}>Date</span>15 – 17 July
                2026
              </span>
              <span className={styles.HeroMetaDivider} aria-hidden="true" />
              <span className={styles.HeroMetaItem}>
                <span className={styles.HeroMetaLabel}>Venue</span>
                Koladaisi Lecture Theatre, Faculty of Computing, UI
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
      <CountDownTimer targetDate={new Date("2026-07-15")} />

      <section className={styles.Announcement}>
        <header className={styles.AnnouncementHead}>
          <span className={styles.AnnouncementEyebrow}>Announcement</span>
          <h2 className={styles.AnnouncementTitle}>About the Conference</h2>
          <p className={styles.AnnouncementKicker}>
            Faculty of Computing · University of Ibadan
            <br />
            15 – 17 July 2026
          </p>
        </header>

        <div className={styles.AnnouncementBody}>
          <p className={styles.AnnouncementLead}>
            The Faculty of Computing, University of Ibadan is pleased to
            announce the International Conference of The Faculty of Computing
            (ICFC), scheduled to be held between 15th and 17th July 2026, at
            Koladaisi Lecture Theatre, Faculty of Computing, UI.
          </p>

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

      <section className={styles.Dates}>
        <header className={styles.DatesHead}>
          <span className={styles.DatesEyebrow}>Important Dates</span>
          <h2 className={styles.DatesTitle}>Key Milestones</h2>
          <p className={styles.DatesKicker}>
            Mark your calendar — submission, review and conference deadlines.
          </p>
        </header>

        <ul className={styles.DatesList}>
          {importantDates.map((item) => (
            <li key={item.activity}>
              <span className={styles.DateActivity}>{item.activity}</span>
              <span className={styles.DateValue}>
                {item.previousDate ? (
                  <>
                    <s className={styles.DateValueOld}>{item.previousDate}</s>
                    <span className={styles.DateValueNew}>{item.date}</span>
                    <span className={styles.DateExtended}>Extended</span>
                  </>
                ) : (
                  item.date
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.HomeInfo}>
        <h2>SPEAKERS &amp; LEADERSHIP</h2>
        <div className={styles.Speakers}>
          {featuredPeople.map((person) => (
            <Speaker key={person.name} {...person} />
          ))}
        </div>
      </div>

      <SubTheme />
    </>
  );
};

const Speaker = ({ image, name, role, description }) => {
  return (
    <div className={styles.Speaker}>
      <div className={styles.speakerImg}>
        <img src={image} alt={name} />
      </div>
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
        target="_blank"
        rel="noreferrer"
      >
        <h6>{role}</h6>
        <h5>{name}</h5>
        {description && (
          <span>
            <i>{description}</i>
          </span>
        )}
      </a>
    </div>
  );
};

Speaker.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Home;
