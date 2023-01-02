import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const { placeholder, value, type, changed, width } = props;
  return (
    <input
      style={{ width: width }}
      className="input-field"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={changed}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  changed: PropTypes.func,
  width: PropTypes.string,
};

export default Input;
