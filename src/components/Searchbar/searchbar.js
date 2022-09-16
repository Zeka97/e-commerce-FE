import React from "react";
import "./searchbar.css";

const Searchbar = () => {
  return (
    <input
      className="searchbar"
      type="text"
      name="searchbar"
      placeholder="Unesite naziv artikla"
    />
  );
};

export default Searchbar;
