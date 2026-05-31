import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";

const advertRates = [
  { label: "Back Full Cover Page", amount: "₦50,000" },
  { label: "Half Back Cover Page", amount: "₦25,000" },
  { label: "Inner Full Cover Page", amount: "₦40,000" },
  { label: "Half Inner Cover Page", amount: "₦20,000" },
  { label: "Full Inner Page", amount: "₦25,000" },
  { label: "Half Inner Page", amount: "₦13,000" },
  { label: "Quarter Inner Page", amount: "₦8,500" },
];

const exhibitionRates = [
  { label: "Exhibition Stand (per booth)", amount: "₦50,000" },
];

const pathToAnchor = {
  "/exhibition": "exhibition",
};

const Advertisement = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash.replace("#", "") || pathToAnchor[pathname];
    if (target) {
      const el = document.getElementById(target);
      if (el) {
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
        title="Adverts & Exhibition"
        info="Promote your brand at the International Conference of the Faculty of Computing (ICFC)"
        bg="https://producer.musicradiocreative.com/wp-content/uploads/2013/04/megaphone.jpg"
      />

      <nav className="adv-nav" aria-label="Adverts & Exhibition sections">
        <div className="adv-nav__inner">
          <NavLink to="/advertisement#adverts" className="adv-nav__link">
            Adverts
          </NavLink>
          <NavLink to="/advertisement#exhibition" className="adv-nav__link">
            Exhibition
          </NavLink>
        </div>
      </nav>

      <section id="adverts" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Adverts</span>
          <h2 className="adv__title">Adverts &amp; Goodwill Messages</h2>
          <p className="adv__lede">
            Individuals, companies and organisations wishing to place adverts or
            goodwill messages in the conference programme / Conference proceedings
            should send their write-up together with the payment fee (cash) to
            the Secretary of the LOC on or before <strong>July 2026</strong>.
          </p>
        </header>

        <ul className="adv__rates">
          {advertRates.map((rate, i) => (
            <li key={rate.label}>
              <span className="adv__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="adv__label">{rate.label}</span>
              <span className="adv__amount">{rate.amount}</span>
            </li>
          ))}
        </ul>

        <div className="adv__cta">
          <p>Ready to place an advert?</p>
          <a href="mailto:icfc@ui.edu.ng?subject=Conference%20Advert">
            Contact the LOC
          </a>
        </div>
      </section>

      <section id="exhibition" className="adv">
        <header className="adv__header">
          <span className="adv__eyebrow">Exhibition</span>
          <h2 className="adv__title">Exhibit at the Conference</h2>
          <p className="adv__lede">
            The Organising Committee invites organisations, industries, NGOs and
            individuals to exhibit their products and services at the
            conference. Exhibition stands will be made available at the venue.
            Interested participants should contact the LOC Secretary on or
            before <strong>July 2026</strong>.
          </p>
        </header>

        <ul className="adv__rates">
          {exhibitionRates.map((rate, i) => (
            <li key={rate.label}>
              <span className="adv__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="adv__label">{rate.label}</span>
              <span className="adv__amount">{rate.amount}</span>
            </li>
          ))}
        </ul>

        <div className="adv__cta">
          <p>Interested in exhibiting?</p>
          <a href="mailto:icfc@ui.edu.ng?subject=Conference%20Exhibition">
            Reserve a Stand
          </a>
        </div>
      </section>
    </>
  );
};

export default Advertisement;
