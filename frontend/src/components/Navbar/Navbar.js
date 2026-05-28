import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import styles from "../../sass/components/navbar.module.scss";

const committees = [
  "Editorial / Publications Committee",
  "Research Ethics & Advisory Committee",
  "Welfare, Registration, Awards & Certification Committee",
  "Technical Committee",
  "Logistics & Venue Committee",
  "Program Committee",
  "Finance & Budget Committee",
  "Sponsorship & Partnership Committee",
  "Publicity & Media Committee",
  "Protocol & VIP Committee",
  "Exhibition & Industry Engagement Committee",
];

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Navbar() {
  const location = useLocation();
  const [navVisibility, setNavVisibility] = useState(false);
  const [committeesOpen, setCommitteesOpen] = useState(false);

  useEffect(() => {
    if (navVisibility) setNavVisibility(false);
    if (committeesOpen) setCommitteesOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (navVisibility) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [navVisibility]);

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <header className={styles.MainNav}>
      <Link to="/" className={styles.brand} aria-label="Home">
        <img src="/ICFC FULL.jpg" alt="University of Ibadan" />
        <span className={styles.brandText}>
          <span className={styles.brandTitle}>University of Ibadan</span>
          <span className={styles.brandSub}>Faculty of Computing · ICFC</span>
        </span>
      </Link>

      <nav
        className={`${styles.navList} ${
          navVisibility ? styles.visibleNav : styles.inVisibleNav
        }`}
        aria-label="Primary"
      >
        <ul>
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/call-for-papers" className={linkClass}>
              Call For Papers
            </NavLink>
          </li>
          <li>
            <NavLink to="/advertisement" className={linkClass}>
              Ads &amp; Exhibition
            </NavLink>
          </li>
          <li>
            <NavLink to="/programme" className={linkClass}>
              Programme
            </NavLink>
          </li>
          <li>
            <div
              className={`${styles.committeesDropdown} ${
                committeesOpen ? styles.dropdownOpen : ""
              }`}
            >
              <div className={styles.committeesDropdownTrigger}>
                <NavLink to="/committees" className={linkClass}>
                  Committees
                </NavLink>
                <button
                  type="button"
                  className={styles.committeesDropdownToggle}
                  aria-label="Toggle committees menu"
                  aria-expanded={committeesOpen}
                  onClick={() => setCommitteesOpen((open) => !open)}
                >
                  <span aria-hidden="true">▾</span>
                </button>
              </div>
              <ul className={styles.committeesDropdownMenu}>
                <li>
                  <Link
                    to="/committees"
                    className={styles.committeesDropdownLink}
                    onClick={() => setCommitteesOpen(false)}
                  >
                    All Committees
                  </Link>
                </li>
                {committees.map((committee) => (
                  <li key={committee}>
                    <Link
                      to={`/committees#${slugify(committee)}`}
                      className={styles.committeesDropdownLink}
                      onClick={() => setCommitteesOpen(false)}
                    >
                      {committee}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {/* <li>
            <NavLink to="/accomodation" className={linkClass}>
              Accommodation
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/contact-us" className={linkClass}>
              Contact
            </NavLink>
          </li>
          <li className={styles.mobileOnly}>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.connect}>
        <Link className={styles.linkBtn} to="/register">
          Register Now
        </Link>
      </div>

      <button
        type="button"
        className={`${styles.hamburger} ${
          navVisibility ? styles.hamburgerOpen : ""
        }`}
        aria-label="Toggle menu"
        aria-expanded={navVisibility}
        onClick={() => setNavVisibility((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Navbar;
