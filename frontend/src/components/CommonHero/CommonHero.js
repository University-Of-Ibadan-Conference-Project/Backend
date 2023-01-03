import styles from "./../../sass/components/CommonHero.module.scss";
import PropTypes from "prop-types";

export default function CommonHero({ title, info, bg }) {
  return (
    <div
      className={styles.CommonHero}
      style={{
        backgroundImage: `linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.65), transparent), url(${bg})`,
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
