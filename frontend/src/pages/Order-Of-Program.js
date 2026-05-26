import React, { useEffect } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CommonHero from "../components/CommonHero/CommonHero";

import VCPic from "./../assets/profileImages/profile-3.jpeg";
import ChairmanPic from "./../assets/profileImages/avatar.jpg";
import DeanPic from "./../assets/profileImages/profile-1.jpeg";

import styles from "./../sass/pages/Order-Of-Program.module.scss";

const days = [
  {
    weekday: "Wednesday",
    date: "15 July 2026",
    sessions: [
      "Arrival and Registration of Participants",
      "Opening Ceremony",
      "Plenary and Technical Sessions",
    ],
  },
  {
    weekday: "Thursday",
    date: "16 July 2026",
    sessions: [
      "Plenary and Technical Sessions",
      "Conference Cocktail",
      "Dinner",
    ],
  },
  {
    weekday: "Friday",
    date: "17 July 2026",
    sessions: [
      "Technical and Plenary Sessions",
      "Awards and Closing",
      "Departure",
    ],
  },
];

const fees = [
  { label: "Local Participants", amount: "₦40,000" },
  { label: "Students (with valid ID)", amount: "₦20,000" },
  { label: "International Participants", amount: "€100" },
];

const leadership = [
  {
    image: VCPic,
    name: "Prof. K.O. Adebowale, mni, FAS",
    role: "Vice Chancellor",
    org: "University of Ibadan",
  },
  {
    image: DeanPic,
    name: "Prof. O.O. Sonibare",
    role: "Dean, Faculty of Science",
    org: "University of Ibadan",
  },
  {
    image: ChairmanPic,
    name: "Prof. S.T. Ogunbanwo",
    role: "Chairman",
    org: "Conference Organising Committee",
  },
];

const members = [
  { name: "Professor O. O. Sonibare", role: "Dean, Faculty of Science" },
  { name: "Professor S. T. Ogunbanwo", role: "Chairman" },
  { name: "Professor O. C. Adeigbe", role: "Co-Chairman" },
  { name: "Dr. B. O. Onasanya", role: "Conference Secretary" },
  { name: "Professor F. C. Ukpokolo", role: "Member" },
  { name: "Dr. A. O. Adeyi", role: "Member" },
  { name: "Dr. Olutoyin A. Fashae", role: "Member" },
  { name: "Dr. Oluwayemisi Alaba", role: "Member" },
  { name: "Dr. K. Banwo", role: "Member" },
  { name: "Dr. Felicia F. Ajayi", role: "Member" },
  { name: "Dr. Nancy C. Wood", role: "Member" },
  { name: "Dr. N. D. Ojo", role: "Member" },
  { name: "Dr. T. T. Ogunseye", role: "Member" },
  { name: "Dr. B. I. Ayinla", role: "Member" },
  { name: "Dr. O. O. Popoola", role: "Member" },
  { name: "M. A. Adejumo", role: "Member" },
  { name: "I. O. Akinwale", role: "Member" },
  { name: "S. O. Alao", role: "Member" },
  { name: "Olaitan Odedele", role: "Faculty Officer" },
];

// Map legacy paths to a section anchor so old links keep working.
const pathToAnchor = {
  "/registration-guideline": "registration",
  "/committee": "committee",
};

export default function OrderOfProgram() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash.replace("#", "") || pathToAnchor[pathname];
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        // Defer to next frame so layout is settled.
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return (
    <>
      <CommonHero
        title="Programme"
        info="Schedule, registration and the team behind the conference"
        bg="https://a-gassociates.com/wp-content/uploads/2022/07/shutterstock_1196667214.jpg"
      />

      <nav className={styles.SectionNav} aria-label="Programme sections">
        <div className={styles.SectionNavInner}>
          <NavLink to="/programme#schedule" className={styles.SectionNavLink}>
            Schedule
          </NavLink>
          <NavLink
            to="/programme#registration"
            className={styles.SectionNavLink}
          >
            Registration
          </NavLink>
          <NavLink to="/programme#committee" className={styles.SectionNavLink}>
            Committee
          </NavLink>
        </div>
      </nav>

      <section id="schedule" className={styles.OrderOfProgram}>
        <header className={styles.Header}>
          <span className={styles.Eyebrow}>Schedule</span>
          <h2 className={styles.Title}>Conference Schedule</h2>
          <p className={styles.Lede}>
            The International Conference for Faculty of Computing (ICFC) runs
            across three days, opening with arrivals and closing with the awards
            ceremony. Times for individual sessions will be published closer to
            the event.
          </p>
        </header>

        <ol className={styles.Schedule}>
          {days.map((day, i) => (
            <li key={day.weekday} className={styles.Day}>
              <div className={styles.DayMeta}>
                <span className={styles.DayNum}>
                  Day {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.DayRule} aria-hidden="true" />
                <span className={styles.DayDate}>
                  <span className={styles.DayWeekday}>{day.weekday}</span>
                  <span className={styles.DayDateText}>{day.date}</span>
                </span>
              </div>

              <ul className={styles.Sessions}>
                {day.sessions.map((session) => (
                  <li key={session}>
                    <span className={styles.SessionMarker} aria-hidden="true" />
                    {session}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section id="registration" className={styles.OrderOfProgram}>
        <header className={styles.Header}>
          <span className={styles.Eyebrow}>Registration</span>
          <h2 className={styles.Title}>Registration Guideline</h2>
          <p className={styles.Lede}>
            The registration fee covers conference materials and tea breaks.
            Only registered participants and guests will be admitted to the
            venue, with one presentation permitted per registration.
          </p>
        </header>

        <ul className={styles.Fees}>
          {fees.map((fee, i) => (
            <li key={fee.label}>
              <span className={styles.FeeIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.FeeLabel}>{fee.label}</span>
              <span className={styles.FeeAmount}>{fee.amount}</span>
            </li>
          ))}
        </ul>

        <div className={styles.RegisterCta}>
          <p>Ready to attend?</p>
          <Link to="/register" className={styles.RegisterCtaBtn}>
            Register Now
          </Link>
        </div>
      </section>

      <section id="committee" className={styles.OrderOfProgram}>
        <header className={styles.Header}>
          <span className={styles.Eyebrow}>Committee</span>
          <h2 className={styles.Title}>Committees & Leadership</h2>
          <p className={styles.Lede}>
            The conference is organised by faculty members of the University of
            Ibadan and chaired by the Conference Organising Committee.
          </p>
        </header>

        <div className={styles.LeadGrid}>
          {leadership.map((p) => (
            <LeadCard key={p.name} {...p} />
          ))}
        </div>

        <h3 className={styles.SubTitle}>Organising Committee</h3>
        <ul className={styles.MemberList}>
          {members.map((m, i) => (
            <li key={m.name}>
              <span className={styles.MemberIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.MemberName}>{m.name}</span>
              <span className={styles.MemberRole}>{m.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

const LeadCard = ({ image, name, role, org }) => (
  <article className={styles.Lead}>
    <div className={styles.LeadImg}>
      <img src={image} alt={name} />
    </div>
    <div className={styles.LeadBody}>
      <h6>{role}</h6>
      <h5>{name}</h5>
      {org && <span>{org}</span>}
    </div>
  </article>
);

LeadCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  org: PropTypes.string,
};
