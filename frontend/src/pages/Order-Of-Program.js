import React from "react";
import PropTypes from "prop-types";
import CommonHero from "../components/CommonHero/CommonHero";

import styles from "./../sass/pages/Order-Of-Program.module.scss";

export default function OrderOfProgram() {
  return (
    <>
      {" "}
      <CommonHero
        title="Order Of Program"
        bg="https://a-gassociates.com/wp-content/uploads/2022/07/shutterstock_1196667214.jpg"
      />
      <div className={styles.OrderOfProgram}>
        <h2
          style={{
            textAlign: "center",
            margin: "4em 0 2em",
            textTransform: "uppercase",
          }}
        >
          Program for the international conference on Strengthening Scientific
          Research for National Development.
        </h2>

        <Dropdown
          date={"Tuesday 6th May, 2025"}
          title="Arrival and Registration of participants"
        ></Dropdown>
        <Dropdown date={"Wednesday 7th May, 2025."}>
          <ul>
            <li>Opening ceremony</li>
            <li>Plenary and Technical Sessions</li>
            <li>Conference Cocktail</li>
          </ul>
        </Dropdown>
        <Dropdown date={"Thursday 8th May, 2025."}>
          <ul>
            <li>Plenary and Technical Sessions</li>
            <li>Dinner</li>
          </ul>
        </Dropdown>
        <Dropdown date={"Friday 9th May, 2025"}>
          <ul>
            <li>Technical and Plenary Sessions</li>
            <li>Awards and Closing</li>
            <li>Departure</li>
          </ul>
        </Dropdown>
      </div>
    </>
  );
}

const Dropdown = ({ date, title, children }) => {
  return (
    <div className={styles.Dropdown}>
      <div className={styles.DropdownHeader}>
        <h2>{date}</h2>
        {title && <h2>{title}</h2>}
      </div>
      <div>{children}</div>
    </div>
  );
};

Dropdown.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
};
