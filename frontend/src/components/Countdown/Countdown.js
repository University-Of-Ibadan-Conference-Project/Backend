import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./../../sass/components/Countdown.module.scss";

const pad = (n) => (n > 9 ? `${n}` : `0${n}`);

const computeRemaining = (target) => {
  const diff = +target - +new Date();
  if (diff < 1) {
    return { days: 0, hours: "00", minutes: "00", seconds: "00", timeUp: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes: pad(Math.floor((diff / (1000 * 60)) % 60)),
    seconds: pad(Math.floor((diff / 1000) % 60)),
    timeUp: false,
  };
};

const CountDownTimer = ({ targetDate }) => {
  const [state, setState] = useState(() => computeRemaining(targetDate));

  useEffect(() => {
    setState(computeRemaining(targetDate));
    const id = setInterval(() => {
      setState(computeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = state;
  const dayString = days === 1 ? "day" : "days";

  return (
    <div className={styles.CountDownTimer}>
      <TimeCard value={String(days)} name={dayString} />
      <TimeCard value={String(hours)} name="hours" />
      <TimeCard value={String(minutes)} name="minutes" />
      <TimeCard value={String(seconds)} name="seconds" />
    </div>
  );
};

const TimeCard = ({ value, name }) => (
  <div className={styles.TimeCard}>
    <h2>{value}</h2>
    <span>{name}</span>
  </div>
);

TimeCard.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
};

CountDownTimer.propTypes = {
  targetDate: PropTypes.instanceOf(Date).isRequired,
};

export default CountDownTimer;
