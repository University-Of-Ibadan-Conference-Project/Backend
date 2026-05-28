import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/img/v2-logo.png";
import styles from "./../../sass/components/Footer.module.scss";

export default function Footer() {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/119494067/admin/dashboard/",
    },
    { label: "X", href: "https://x.com/FoC_UI" },
    {
      label: "Facebook",
      href: "https://web.facebook.com/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=61590340744768&sk=about",
    },
  ];

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
          <div className={styles.FooterSocial} aria-label="Social media pages">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
          <span>© {new Date().getFullYear()} Faculty of Computing · UI</span>
        </div>
      </div>
    </footer>
  );
}
