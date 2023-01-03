import React from "react";
import { data } from "../constants";
import { useState } from "react";

const Faq = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <section className="app__faq app__section">
      <h1 className="section__title app__faq-title">
        Frequently
        <br />
        Asked
        <br />
        Questions
      </h1>
      <div className="questions">
        {data?.faq?.map((item, i) => (
          <div className="item" key={i}>
            <div className="title" onClick={() => toggle(i)}>
              <h2>{item.question}</h2>
              <span>{selected === i ? "-" : "+"}</span>
            </div>
            <div className={selected === i ? "content show" : "content"}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
