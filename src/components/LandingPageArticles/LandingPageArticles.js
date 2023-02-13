import React from "react";
import Card from "../card/Card";

import "./LandingPageArticles.css";

const LandingPageArticles = (props) => {
  return (
    <div className="Landing_articles_box">
      <div className="Landing_articles_header">
        <h3>{props.header}</h3>
        <span onClick={props.onClick}>Vidi sve...</span>
      </div>
      <div className="Landing_articles_list">
        {props.isSuccess &&
          props.data.articles.map((item) => <Card id={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default LandingPageArticles;
