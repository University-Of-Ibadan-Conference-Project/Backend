import React from "react";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiTimeLine,
  RiArrowRightLine,
} from "react-icons/ri";
import "../../sass/components/contact.scss";

const Contact = () => {
  return (
    <section className="contactPage">
      <div className="contactPage__intro">
        <span className="eyebrow">Contact</span>
        <h1>Get in touch</h1>
        <p className="lede">
          For all inquiries about the conference, please reach out to the
          Secretary of the Local Organising Committee. We&apos;re happy to help
          with registration, submissions, accommodation, or logistics.
        </p>
      </div>

      <div className="contactPage__grid">
        <a href="mailto:icfc@ui.edu.ng" className="contactPage__card">
          <span className="contactPage__cardIcon">
            <RiMailLine size={22} />
          </span>
          <div className="contactPage__cardBody">
            <span className="contactPage__cardLabel">Email</span>
            <span className="contactPage__cardValue">icfc@ui.edu.ng</span>
            <span className="contactPage__cardHint">
              Send a message <RiArrowRightLine size={14} />
            </span>
          </div>
        </a>

        <a href="tel:+2348035566361" className="contactPage__card">
          <span className="contactPage__cardIcon">
            <RiPhoneLine size={22} />
          </span>
          <div className="contactPage__cardBody">
            <span className="contactPage__cardLabel">Telephone</span>
            <span className="contactPage__cardValue">+234 803 556 6361</span>
            <span className="contactPage__cardHint">Conference Secretary</span>
          </div>
        </a>

        <div className="contactPage__card">
          <span className="contactPage__cardIcon">
            <RiMapPin2Line size={22} />
          </span>
          <div className="contactPage__cardBody">
            <span className="contactPage__cardLabel">Venue</span>
            <span className="contactPage__cardValue">
              Koladaisi
            </span>
            <span className="contactPage__cardHint">
              University of Ibadan
            </span>
          </div>
        </div>

        <div className="contactPage__card">
          <span className="contactPage__cardIcon">
            <RiTimeLine size={22} />
          </span>
          <div className="contactPage__cardBody">
            <span className="contactPage__cardLabel">Office hours</span>
            <span className="contactPage__cardValue">
              Mon – Fri · 9am – 4pm
            </span>
            <span className="contactPage__cardHint">West Africa Time</span>
          </div>
        </div>
      </div>

      <div className="contactPage__callout">
        <div>
          <h3>Have feedback for the organisers?</h3>
          <p>
            We welcome your suggestions — every piece of feedback helps us shape
            a better conference.
          </p>
        </div>
        <a
          href="mailto:icfc@ui.edu.ng?subject=Conference%20Feedback"
          className="contactPage__calloutBtn"
        >
          Share feedback <RiArrowRightLine size={16} />
        </a>
      </div>
    </section>
  );
};

export default Contact;
