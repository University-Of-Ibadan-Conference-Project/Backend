import { registrationFees } from "../../data/registrationFees";
import styles from "./RegistrationFeesTable.module.scss";

export default function RegistrationFeesTable() {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>Registration fees</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Naira (₦)</th>
            <th scope="col">USD / EUR</th>
          </tr>
        </thead>
        <tbody>
          {registrationFees.map((row) => (
            <tr key={row.category}>
              <th scope="row">
                {row.category}
                {row.detail ? (
                  <span className={styles.detail}>{row.detail}</span>
                ) : null}
              </th>
              <td>{row.naira}</td>
              <td>{row.usdEuro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
