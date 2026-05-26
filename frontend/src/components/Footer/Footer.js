import { Link } from "react-router-dom";
import logo from "./../../assets/img/v2-logo.png";
import styles from "./../../sass/components/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterInner}>
        <Link to="/" className={styles.FooterBrand} aria-label="Home">
          <img src={logo} alt="University of Ibadan" />
          <span>
            <span className={styles.FooterBrandTitle}>
              Faculty of Computing
            </span>
            <span className={styles.FooterBrandSub}>
              University of Ibadan · ICFC
            </span>
          </span>
        </Link>

        <nav className={styles.FooterNav} aria-label="Footer">
          <Link to="/programme">Programme</Link>
          <Link to="/call-for-papers">Call for Papers</Link>
          <Link to="/register">Register</Link>
          <Link to="/contact-us">Contact</Link>
        </nav>

        <div className={styles.FooterContact}>
          <a href="mailto:icfc@ui.edu.ng">icfc@ui.edu.ng</a>
          <span>© {new Date().getFullYear()} Faculty of Computing · UI</span>
        </div>
      </div>
    </footer>
  );
}
