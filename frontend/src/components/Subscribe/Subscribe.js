import { useState } from "react";
import styles from "./../../sass/components/Subscribe.module.scss";

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const emailSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className={styles.Subscribe}>
      <div className={styles.SubscribeContent}>
        <div className={styles.SubscribeHeader}>
          <h2>Subcribe so you don&apos;t Miss Anything</h2>
          <span>
            By Becoming a member of our email list, You will be the first hear
            about a news
          </span>
        </div>
        <form
          onSubmit={emailSubmissionHandler}
          className={styles.SubscribeForm}
        >
          <label htmlFor="email">Email Address</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button className={styles.Button} type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
