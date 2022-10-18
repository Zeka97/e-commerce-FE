import React from "react";

import "./StatisticBox.css";

const StatisticBox = (props) => {
  return (
    <div className="statistic-box">
      <h3>{props.header}</h3>
      <span>{props.desc}</span>
    </div>
  );
};

export default StatisticBox;
