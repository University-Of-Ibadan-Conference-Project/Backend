import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import uiLogo from "./../../assets/img/v2-logo.png";

import styles from "../../sass/components/navbar.module.scss";

function Navbar({ navVisibility, setNavVisibility }) {
  const [activeNav, setActiveNav] = useState("/");
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveNav(pathname);
  }, [pathname]);

  useEffect(() => {
    if (navVisibility) {
      window.onscroll = () => window.scroll(0, 0);
    } else {
      window.onscroll = () => {};
    }
  }, [navVisibility]);
  const color = "#cfcfcf";

  return (
    <div className={styles.MainNav}>
      <h2>
        <Link to={"/"}>
          <img src={uiLogo} alt="University of Ibadan" />
        </Link>
      </h2>
      <ul className={navVisibility ? styles.visibleNav : styles.inVisibleNav}>
        <li>
          <Link className="link" to={"/"}>
            <p style={{ color: activeNav === "/" ? color : "" }}>Home</p>
          </Link>
        </li>
        <li>
          <Dropdown
            dropdownName="Call For Papers"
            dropdownContent={[
              {
                name: "Submission Guideline",
                route: "/submit-guidelines",
              },
              {
                name: "Abstract Submission",
                route: "/submit-abstract",
              },
              {
                name: "Presentation Guideline",
                route: "/presentation-guideline",
              },
              {
                name: "Publication of Conference Papers",
                route: "/publication-of-conference-papers",
              },
            ]}
          />
        </li>
        <li>
          <Dropdown
            dropdownName="Advertisement"
            dropdownContent={[
              {
                name: "Advertisement",
                route: "/advertisement",
              },
              {
                name: "Exhibition",
                route: "/exhibition",
              },
            ]}
          />
        </li>
        <li>
          <Dropdown
            dropdownName="Programme"
            dropdownContent={[
              {
                name: "Order of Programme",
                route: "/programme",
              },
              {
                name: "Registration Guideline",
                route: "/registration-guideline",
              },
              {
                name: "Committees",
                route: "/committee",
              },
            ]}
          />
        </li>
        <li>
          <Link className="link" to={"/accomodation"}>
            <p style={{ color: activeNav === "/accomodation" ? color : "" }}>
              {" "}
              Accomodation
            </p>
          </Link>
        </li>
        {/* <Link className="link" to={"/submit-abstract"}>
            Call For Papers
          </Link> */}
        {/* <li>
          <Link className="link" to={"/contact-us"}>
            Contact Us
          </Link>{" "}
        </li> */}
        <li>
          <Link className="link" to={"/register"}>
            <p style={{ color: activeNav === "/register" ? color : "" }}>
              {" "}
              Register
            </p>
          </Link>
        </li>
      </ul>
      <div className={styles.connect}>
        {/* <span>
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </span> */}
        <Link className={styles.linkBtn} to={"/register"}>
          Register Now
        </Link>
      </div>

      <div className={styles.hamburger}>
        <span
          type="checkbox"
          tabIndex="-1"
          id="checkbox"
          className={[
            styles.hamburger_check,
            navVisibility ? styles.hamburger_check_checked : "",
          ].join(" ")}
        ></span>
        <div
          className={styles.Checkbox}
          onClick={() => setNavVisibility((visibility) => !visibility)}
        >
          <span className={styles.hamburger_bars}></span>
          <span className={styles.hamburger_bars}></span>
          <span className={styles.hamburger_bars}></span>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  navVisibility: PropTypes.bool,
  setNavVisibility: PropTypes.func,
};

export default Navbar;
