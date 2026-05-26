import CommonHero from "../components/CommonHero/CommonHero";
import { RiArrowRightUpLine, RiPhoneLine, RiMapPin2Line } from "react-icons/ri";
import styles from "./../sass/pages/Accomodation.module.scss";
import hotel from "./../assets/img/hotel.jpg";

const hotels = [
  {
    mapLink: "https://goo.gl/maps/uFxgsofxHMDQhMjz9",
    name: "University of Ibadan Hotels",
    area: "UI, Ibadan",
    phone: "+234 708 400 0002",
  },
  {
    mapLink: "https://goo.gl/maps/dTN3B4SqvmFtXrDZA",
    name: "UI Alumni Guest House",
    area: "University of Ibadan",
    phone: "+234 810 794 5501",
  },
  {
    mapLink: "https://goo.gl/maps/bRjetTF5GiKeuC7a9",
    name: "Josiah's Inn",
    area: "Opposite NISER",
    phone: "+234 803 703 0000",
  },
  {
    mapLink: "https://goo.gl/maps/YT58Pw3AUoHNkmpN8",
    name: "Davis Hotel",
    area: "Old Bodija, Ibadan",
    phone: "+234 802 338 7433",
  },
  {
    mapLink: "https://goo.gl/maps/rXVWVA5u2vbFfULK9",
    name: "Pastoral Institute",
    area: "Bodija, Ibadan",
    phone: "+234 703 850 2703",
  },
  {
    mapLink: "https://goo.gl/maps/ifU596szfhMP9cdcA",
    name: "LABOD Hotel",
    area: "Old Bodija, Ibadan",
    phone: "+234 704 228 6331",
  },
  {
    mapLink: "https://goo.gl/maps/XMEiSj4vBLDaREwq7",
    name: "NUT Guest House",
    area: "Samonda, Ibadan",
    phone: "+234 803 616 9953",
  },
  {
    mapLink: "https://goo.gl/maps/ozKZ88Nt4SENfzeZ8",
    name: "Institute of Church Guest House",
    area: "Samonda, Ibadan",
    phone: "+234 805 963 8707",
  },
  {
    mapLink: "https://goo.gl/maps/zftZK6gtCa6DdUjW7",
    name: "Grace and Suites Hotel",
    area: "Aare Avenue, Bodija, Ibadan",
    phone: "+234 901 165 8151",
  },
];

const Accomodation = () => {
  return (
    <div>
      <CommonHero
        title="Hotel Accommodation"
        info="Where to stay around the University of Ibadan"
        bg={hotel}
      />

      <div className={styles.Intro}>
        <p>
          Participants are responsible for their own accommodation. Below are
          standard hotels and guest houses around the University of Ibadan.
          Nightly charges range between <strong>N8,000 and N55,000</strong>. All
          inquiries should be directed to the{" "}
          <a href="mailto:uisc2023@gmail.com">
            Secretary of the Local Organising Committee
          </a>
          .
        </p>
      </div>

      <ul className={styles.HotelGrid}>
        {hotels.map((h, i) => (
          <li key={h.mapLink} className={styles.Hotel}>
            <div className={styles.HotelIndex}>
              <span className={styles.HotelNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.HotelRule} aria-hidden="true" />
            </div>
            <div className={styles.HotelBody}>
              <h3 className={styles.HotelName}>{h.name}</h3>
              <p className={styles.HotelArea}>
                <RiMapPin2Line size={14} aria-hidden="true" />
                {h.area}
              </p>
              <a
                href={`tel:${h.phone.replace(/\s/g, "")}`}
                className={styles.HotelPhone}
              >
                <RiPhoneLine size={14} aria-hidden="true" />
                {h.phone}
              </a>
            </div>
            <a
              href={h.mapLink}
              target="_blank"
              rel="noreferrer"
              className={styles.HotelMap}
            >
              <span>View Map</span>
              <RiArrowRightUpLine size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Accomodation.propTypes = {};

export default Accomodation;
