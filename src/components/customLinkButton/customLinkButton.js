import React from "react";
import "./customLinkButton.css";

import { Link } from "react-router-dom";

const CustomLinkButton = (props) => {
  return (
    <Link onClick={props.onClick} to={props.to} className={props.className}>
      {props.children}
    </Link>
  );
};
export default CustomLinkButton;
