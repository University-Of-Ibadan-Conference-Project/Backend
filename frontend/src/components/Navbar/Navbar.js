import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import uiLogo from "./../../assets/img/v2-logo.png";

import styles from "../../sass/components/navbar.module.scss";

function Navbar() {
  const location = useLocation();
  const [navVisibility, setNavVisibility] = useState(false);

  useEffect(() => {
    if (navVisibility) setNavVisibility(false);
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
        <img src={uiLogo} alt="University of Ibadan" />
        <span className={styles.brandText}>
          <span className={styles.brandTitle}>University of Ibadan</span>
          <span className={styles.brandSub}>Faculty of Science · 6th ICSR</span>
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
            <NavLink to="/accomodation" className={linkClass}>
              Accommodation
            </NavLink>
          </li>
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
