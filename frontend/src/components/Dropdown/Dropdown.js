import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ dropdownName, dropdownContent }) => {
  const [isActive, SetisActive] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        SetisActive(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="dropdown" ref={menuRef}>
      <div className="dropdown-btn" onClick={() => SetisActive(!isActive)}>
        {dropdownName}
        {isActive ? (
          <FaCaretUp color="#fff" className={"icon"} />
        ) : (
          <FaCaretDown color="#fff" className={"icon"} />
        )}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {dropdownContent.map((dropdownContentValue, index) => (
            <Link
              key={index}
              className={"item"}
              to={dropdownContentValue.route}
            >
              <div className="dropdown-item">{dropdownContentValue.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  dropdownName: PropTypes.string,
  dropdownContent: PropTypes.array,
};

export default Dropdown;
