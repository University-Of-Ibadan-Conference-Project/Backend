import CommonHero from "../components/CommonHero/CommonHero";
import conferenceBg from "../assets/img/conference-bg.jpg";
import PropTypes from "prop-types";

import VCPic from "./../assets/profileImages/profile-3.jpeg";
import ChairmanPic from "./../assets/profileImages/profile-1.jpeg";
import DeanPic from "./../assets/profileImages/profile-2.jpeg";

import styles from "./../sass/pages/Committee.module.scss";

export default function Committee() {
  return (
    <div className="committee">
      <CommonHero title="Committee" bg={conferenceBg} />
      <section className={styles.Committee}>
        <h2
          style={{
            margin: "4em 0 1em",
            textTransform: "uppercase",
          }}
        >
          CONFERENCE ORGANISING COMMITTEE
        </h2>
        <div className={styles.CommitteeList}>
          <div>
            <p>Professor A. A. Bakare, FAS</p>
            <p>Dean, Faculty of Science</p>
          </div>
          <div>
            <p>Professor O. O. Sonibare</p>
            <p>Chairman</p>
          </div>
          <div>
            <p>Professor S. T. Ogunbanwo</p>
            <p>Co-Chairman</p>
          </div>
          <div>
            <p>Professor G. A. Adewuyi</p>
            <p>Managing Editor (Journal of Science Research)</p>
          </div>
          <div>
            <p>Professor A. S. Olatunji</p>
            <p>Secretary, LOC</p>
          </div>
          <div>
            <p>Dr. A. O. Adeyi</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. H.P. Adeyemo</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. Temitope E. Olalekan</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. Seun Otekunrin</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. B.O. Ololajulo</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. Aderonke B. Sakpere</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. I. A. Otunla</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. K. Banwo</p>
            <p>Member</p>
          </div>
          <div>
            <p>Dr. B. I. Ayinla</p>
            <p>Member</p>
          </div>
          <div>
            <p>Mr. A. M. Adejumo</p>
            <p>Member</p>
          </div>
          <div>
            <p>Mr. S.O. Alao</p>
            <p>Member</p>
          </div>
          <div>
            <p>Mr. I. O.I. Akinwale</p>
            <p>Member</p>
          </div>
          <div>
            <p>Mr. O. Olomiloro</p>
            <p>Faculty Officer</p>
          </div>
        </div>
      </section>

      <section className={styles.Committee}>
        <div className={styles.CommitteeCard}>
          <Speaker
            image={VCPic}
            name={"Prof. K.O. Adebowale, mni, FAS "}
            title={"(The Vice Chancellor, University of Ibadan)"}
          />
        </div>
        <div className={styles.CommitteeCard}>
          <Speaker
            image={DeanPic}
            name={"Prof. A.A. Bakare, FAS "}
            title={"(Dean, Faculty of Science, University of Ibadan)"}
          />
          <Speaker
            image={ChairmanPic}
            name={"Prof. O.O. Sonibare "}
            title="(Chairman, Conference Organizing Committee)"
          />
        </div>
      </section>
    </div>
  );
}

const Speaker = ({ image, name, title }) => {
  return (
    <div className={styles.Speaker}>
      <img
        src={
          image
            ? image
            : "https://www.calwestern.com/wp-content/uploads/2020/08/person-4-300x300-min.png"
        }
        alt="keynote speaker"
      />
      <h5>{name}</h5>
      <h5>{title}</h5>
      {/* <h6>
        <span>
          <strong>{name}</strong>
        </span>
      </h6> */}
    </div>
  );
};

Speaker.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
};
