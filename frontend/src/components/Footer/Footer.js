import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "./../../sass/components/Footer.module.scss";
import logo from "./../../assets/img/v2-logo.png";

export default function Footer() {
  
  return (
    <>
      {/* <Subscribe /> */}
      <div className={styles.Footer}>
        <div className={styles.FooterData}>
          <div>
            <img src={logo} alt="logo" />
            <p>Faculty of Science, University of Ibadan</p>
          </div>
          <div>
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/submit-abstract">Abstract Submission</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Other Pages</h2>
            <ul>
              <li>
                <Link to="/accomodation">Accomodation</Link>
              </li>
              <li>
                <Link to="/advertisement">Advertisement</Link>
              </li>
              {/* <li>
                <Link to="/about-us">About Us</Link>
              </li> */}
              <li>
                <Link to="/committee">Committee</Link>
              </li>
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "1em",
            }}
          >
            <div>
              <h2>Socials</h2>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <RiTwitterFill
                  size={30}
                  fill="#98A2B3"
                  className={styles.FooterIcon}
                />
              </a>
              <a
                href="https://web.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <RiFacebookCircleFill
                  size={30}
                  fill="#98A2B3"
                  className={styles.FooterIcon}
                />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <RiInstagramFill
                  size={30}
                  fill="#98A2B3"
                  className={styles.FooterIcon}
                />
              </a>
              <a href="https://whatsapp.com/" target="_blank" rel="noreferrer">
                <RiWhatsappFill
                  size={30}
                  fill="#98A2B3"
                  className={styles.FooterIcon}
                />
              </a>
            </div>
          </div>
        </div>
        <span className={styles.FooterCopyRight}>
          Copyright &copy; {new Date().getFullYear()} - Department Of Computer
          Science - University of Ibadan
        </span>
      </div>
    </>
  );
}
