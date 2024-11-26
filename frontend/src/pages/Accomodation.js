import CommonHero from "../components/CommonHero/CommonHero";
import PropTypes from "prop-types";
import styles from "./../sass/pages/Accomodation.module.scss";
// import hotelPreview from "./../assets/img/hotel-preview.jpeg";
import hotel from "./../assets/img/hotel.jpg";

const Accomodation = () => {
  return (
    <div>
      <CommonHero
        title="HOTEL ACCOMMODATION"
        info="Get to know more about where to stay"
        bg={hotel}
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
          N8,000 and N55,000/night.
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
          phone="+234 708 400 0002"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/dTN3B4SqvmFtXrDZA"
          name="University of Ibadan Alumni Guest House"
          phone="+234 810 794 5501"

        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/bRjetTF5GiKeuC7a9"
          name="Josiah's Inn, Opposite NISER"
          phone="+234 803 703 0000"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/YT58Pw3AUoHNkmpN8"
          name="Davis Hotel, Old Bodija, Ibadan"
          phone = "+234 802 338 7433"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/rXVWVA5u2vbFfULK9"
          name="Pastoral Institute, Bodija Ibadan"
          phone= "+234 703 850 2703"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/ifU596szfhMP9cdcA"
          name="LABOD Hotel Old Bodija, Ibadan."
          phone= "+234 704 228 6331"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/XMEiSj4vBLDaREwq7"
          name="NUT Guest house, Samonda, Ibadan."
          phone="+234 803 616 9953"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/ozKZ88Nt4SENfzeZ8"
          name="Institute of Church Guest House, Samonda, Ibadan."
          phone="+234 805 963 8707"
        />
        <HotelPrevCard
          mapLink="https://goo.gl/maps/zftZK6gtCa6DdUjW7"
          name="Grace and Suites Hotel, Aare Avenue, Bodija Ibadan."
          phone="+234 901 165 8151"
        />
      </div>
    </div>
  );
};

const HotelPrevCard = ({ mapLink, name, phone}) => (
  <div
    className={styles.container}
    // data-aos="zoom-in-down"
    // data-aos-easing="ease-out-cubic"
    // data-aos-duration="2500"
  >
    <div className={styles.hotelPreview}></div>
    <div className={styles.content}>
      <h3>{name}</h3>
      <h4>{phone}</h4>

      <a href={mapLink} target="_blank" rel="noreferrer" className={styles.btn}>
        <span>Show Map</span>
      </a>
    </div>
  </div>
);

HotelPrevCard.propTypes = {
  name: PropTypes.string,
  mapLink: PropTypes.string,
  phone: PropTypes.string,
};

export default Accomodation;
