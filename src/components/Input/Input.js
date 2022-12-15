import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <input
      style={props.style || null}
      className={props.className}
      width={props.width || null}
      height={props.height || null}
      defaultValue={props.defaultValue || null}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder || null}
    />
  );
};

export default Input;
