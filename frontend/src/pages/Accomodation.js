import CommonHero from "../components/CommonHero/CommonHero";
import PropTypes from "prop-types";
import styles from "./../sass/pages/Accomodation.module.scss";
import hotelPreview from "./../assets/img/hotel-preview.jpeg";

const Accomodation = () => {
  return (
    <div>
      <CommonHero
        title="HOTEL ACCOMMODATION"
        info="Get to know more about where to stay"
        bg={hotelPreview}
      />
      {/* <h2>Hello</h2> */}
      <div
        style={{
          width: "80%",
          margin: "auto",
          // textAlign: "left",
          textAlign: "justify",
          textJustify: "inter-word",
          lineHeight: "2em",
          padding: "2em 0",
        }}
      >
        Participants will be responsible for their accommodation. Below are
        available standard hotels and guest houses with good lodging in and
        around the University of Ibadan. Charges are moderate, between{" "}
        <b
          style={{
            color: "red",
          }}
        >
          N8,000 and N30,000/night.
        </b>{" "}
        All inquiries should be directed to the{" "}
        <a href="mailto:uisc2023@gmail.com">
          Secretary of the Local Organising Committee
        </a>{" "}
        of this conference.
      </div>
      <div className={styles.HotelDisplayCards}>
        <HotelPrevCard
          mapLink="https://goo.gl/maps/uFxgsofxHMDQhMjz9"
          name="University of Ibadan Hotels, UI, Ibadan"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/dTN3B4SqvmFtXrDZA"
          name="University of Ibadan Alumni Guest House"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/bRjetTF5GiKeuC7a9"
          name="Josiah's Inn, Opposite NISER"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/2K2sYsFhXf6PBUuE9"
          name="Plaza Park Hotel, Bodija"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/m4YoWTCk2Q5G786u5"
          name="Christian Guest House, Samonda, Ibadan"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/YT58Pw3AUoHNkmpN8"
          name="Davis Hotel, Old Bodija, Ibadan"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/rXVWVA5u2vbFfULK9"
          name="Pastoral Institute, Bodija Ibadan"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/ifU596szfhMP9cdcA"
          name="LABOD Hotel Old Bodija, Ibadan."
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/XMEiSj4vBLDaREwq7"
          name="NUT Guest house, Samonda, Ibadan."
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/ozKZ88Nt4SENfzeZ8"
          name="Institute of Church Guest House, Samonda, Ibadan."
        />
        <HotelPrevCard
          mapLink=""
          name="De Executive Hotel, Off Osuntokun, Bodija, Ibadan."
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/zftZK6gtCa6DdUjW7"
          name="Grace and Suites Hotel, Aare Avenue, Bodija Ibadan."
        />
      </div>
    </div>
  );
};

const HotelPrevCard = ({ mapLink, name }) => (
  <div
    className={styles.container}
    // data-aos="zoom-in-down"
    // data-aos-easing="ease-out-cubic"
    // data-aos-duration="2500"
  >
    <div className={styles.hotelPreview}></div>
    <div className={styles.content}>
      <h3>{name}</h3>
      <a href={mapLink} target="_blank" rel="noreferrer" className={styles.btn}>
        <h4>Show Map</h4>
      </a>
    </div>
  </div>
);

HotelPrevCard.propTypes = {
  name: PropTypes.string,
  mapLink: PropTypes.string,
};

export default Accomodation;
