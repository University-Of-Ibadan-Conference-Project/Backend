import React from "react";
import "../../sass/components/contact.scss";

const Contact = () => {
  return (
    <section className="contactPage">
      <div className="body">
        <h2>Get in touch</h2>
        <div className="mail">
          <h2>
            All inquiries about the conference should be directed to the
            Secretary of the Local Organising Committee
          </h2>
          <br />

          <h2>Telephones: +2348035566361</h2>

          <br />

          <h2>E-mails: faculty_science@ui.edu.ng</h2>
        </div>
        <div className="feedback">
          <p>Any feedback is appreciated</p>
        </div>
      </div>
      {/* <div className="form">
        <div className="head">
          <div className="section-1">
            <label htmlFor="fname">First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="section-2">
            <label htmlFor="lname">Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
        </div>
        <div className="head">
          <div className="section-1">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="section-2">
            <label htmlFor="num">Phone Number</label>
            <input type="number" placeholder="+000 00000000" />
          </div>
        </div>
        <div className="mes">
          <label htmlFor="mes">Message</label>
          <textarea placeholder="Message"></textarea>
        </div>
        <button>Submit</button>
      </div> */}
    </section>
  );
};

export default Contact;
