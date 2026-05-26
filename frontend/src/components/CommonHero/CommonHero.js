import styles from "./../../sass/components/CommonHero.module.scss";
import PropTypes from "prop-types";

export default function CommonHero({ title, info, bg }) {
  return (
    <div
      className={styles.CommonHero}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15, 29, 54, 0.78) 0%, rgba(15, 29, 54, 0.88) 100%), url(${bg})`,
      }}
    >
      <div className={styles.CommonHeroInfo}>
        <h1>{title}</h1>
        <span>{info}</span>
      </div>
    </div>
  );
}

CommonHero.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
  bg: PropTypes.string,
};
