import { Link } from "react-router-dom";
import styles from "../sass/pages/Notfound.module.scss";

export default function Notfound() {
  return (
    <div className={styles.Notfound}>
      <h1>Sorry, Page Not Found</h1>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
