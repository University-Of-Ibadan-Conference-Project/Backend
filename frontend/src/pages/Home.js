import CountDownTimer from "../components/Countdown/Countdown";
import styles from "./../sass/pages/Home.module.scss";
// import PropTypes from "prop-types";
import SubTheme from "../components/SubTheme/SubTheme";
import { Link } from "react-router-dom";

// Speakers hidden for now — restore by uncommenting the imports, the
// <div className={styles.HomeInfo}> block in Home, and the Speaker component
// definition + PropTypes at the bottom of the file.
// import speaker1 from "./../assets/speakers/_3.JPG";
// import speaker3 from "./../assets/speakers/_2.JPG";
// import speaker4 from "./../assets/speakers/_4.JPG";
// import speaker5 from "./../assets/speakers/_5.JPG";
// import speaker6 from "./../assets/speakers/_6.JPG";
// import speaker7 from "./../assets/speakers/_7.JPG";

const importantDates = [
  { activity: "Call for Papers Opens", date: "May 28, 2026" },
  { activity: "Paper Submission Deadline", date: "June 20, 2026" },
  { activity: "Review Period", date: "June 21 – July 5, 2026" },
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
              International Conference for Faculty of Computing (ICFC)
            </span>
            <h1 className={styles.HeroTitle}>
              Frontiers in Computing for Sustainable Development
            </h1>
            <p className={styles.HeroTheme}>
              <span className={styles.HeroThemeLabel}>Theme</span>
              INTERNATIONAL CONFERENCE ON FRONTIERS IN COMPUTING FOR SUSTAINABLE
              DEVELOPMENT
            </p>
            <div className={styles.HeroMeta}>
              <span className={styles.HeroMetaItem}>
                <span className={styles.HeroMetaLabel}>Date</span>15 – 17 July
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
            announce the International Conference for Faculty of Computing
            (ICFC), scheduled to be held between 15th and 17th July 2026, at the
            Lakeside Lecture Theater, University of Ibadan.
          </p>

          <blockquote className={styles.AnnouncementQuote}>
            <span className={styles.AnnouncementQuoteLabel}>Theme</span>
            INTERNATIONAL CONFERENCE ON FRONTIERS IN COMPUTING FOR SUSTAINABLE
            DEVELOPMENT
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
              <span className={styles.DateValue}>{item.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/*
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
      */}

      <SubTheme />
    </>
  );
};

// const Speaker = ({ dp, name, speakerType, status }) => {
//   const label =
//     speakerType === "keynote"
//       ? "Keynote Speaker"
//       : speakerType === "plenary"
//         ? "Plenary Speaker"
//         : "Guest Speaker";
//
//   return (
//     <div className={styles.Speaker}>
//       <div className={styles.speakerImg}>
//         <img src={dp} alt={name} />
//       </div>
//       <a
//         href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
//         target="_blank"
//         rel="noreferrer"
//       >
//         <h6>{label}</h6>
//         <h5>{name}</h5>
//         {status && (
//           <span>
//             <i>{status}</i>
//           </span>
//         )}
//       </a>
//     </div>
//   );
// };
//
// Speaker.propTypes = {
//   dp: PropTypes.string,
//   status: PropTypes.string,
//   speakerType: PropTypes.oneOf(["keynote", "plenary", "guest"]),
//   name: PropTypes.string,
// };

export default Home;
