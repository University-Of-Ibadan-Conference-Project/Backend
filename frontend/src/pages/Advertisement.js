import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import { Link } from "react-router-dom";

const advertisement = () => {
  return (
    <>
      <CommonHero
        title="Advertisment"
        bg="https://producer.musicradiocreative.com/wp-content/uploads/2013/04/megaphone.jpg"
      />
      <div
        style={{
          width: "80%",
          margin: "auto",
          // textAlign: "left",
          textAlign: "justify",
          textJustify: "inter-word",
          lineHeight: "2em",
          padding: "2em 0 4em",
        }}
      >
        Individuals, companies and organisations wishing to place adverts and/or
        goodwill messages in the conference programme/Book of Abstracts should
        upload their write-up together with the evidence of payment{" "}
        <Link to="/submission">here</Link> on or before 5 April, 2023.
      </div>

      <div className="app__adverts">
        <div className="app__adverts-section app__adverts-rates">
          <h1>RATES</h1>
          <div className="rates-list">
            <span className="rate">
              <p>Back Full Cover Page</p>
              <p>₦50,000.00</p>
            </span>
            <span className="rate">
              <p>Half Back Cover Page</p>
              <p>₦25,000.00</p>
            </span>
            <span className="rate">
              <p>Inner Full Cover Page</p>
              <p>₦40,000.00</p>
            </span>
            <span className="rate">
              <p>Half Inner Cover Page</p>
              <p>₦20,000.00</p>
            </span>
            <span className="rate">
              <p>Full Inner Page</p>
              <p>₦25,000.00</p>
            </span>
            <span className="rate">
              <p>Half Inner Page</p>
              <p>₦13,000.00</p>
            </span>
            <span className="rate">
              <p>Quarter Inner Page</p>
              <p>₦8,500.00</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default advertisement;
