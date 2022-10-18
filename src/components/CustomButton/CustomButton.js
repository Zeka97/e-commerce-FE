import React from "react";

import "./CustomButton.css";

const CustomButton = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};

export default CustomButton;
