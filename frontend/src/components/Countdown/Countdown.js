import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./../../sass/components/Countdown.module.scss";

const CountDownTimer = () => {
  const [state, setState] = useState({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
    timeUp: false,
  });

  useEffect(() => {
    let countdown = () => {
      let date = +new Date("05/02/2023");
      let difference = date - +new Date();
      if (difference < 1) {
        setState((prevState) => ({ ...prevState, timeUp: true }));
      } else {
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((difference / (1000 * 60)) % 60);
        let seconds = Math.floor((difference / 1000) % 60);

        setState((prevState) => ({
          ...prevState,
          hours: hours > 9 ? hours : `0${hours}`,
          minutes: minutes > 9 ? minutes : `0${minutes}`,
          seconds: seconds > 9 ? seconds : `0${seconds}`,
          days,
        }));
      }
    };
    setInterval(countdown, 1000);

    return () => clearInterval(countdown, 1000);
  }, []);

  const { days, hours, minutes, seconds } = state;
  const dayString = days > 1 ? "days" : "day";

  return (
    <div className={styles.CountDownTimer}>
      <TimeCard value={days} name={dayString} />
      <TimeCard value={hours} name={"hours"} />
      <TimeCard value={minutes} name={"minutes"} />
      <TimeCard value={seconds} name={"seconds"} />
    </div>
  );
};

const TimeCard = ({ value, name }) => {
  return (
    <div className={styles.TimeCard}>
      <h2>{value}</h2>
      <span>{name}</span>
    </div>
  );
};

TimeCard.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string,
};

export default CountDownTimer;
