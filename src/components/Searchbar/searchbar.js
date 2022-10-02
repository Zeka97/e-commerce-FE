import React, { useState, useEffect } from "react";
import axios from "../Axios/axios";
import "./searchbar.css";

const Searchbar = ({ searchValue, setSearchValue }) => {
  return (
    <input
      className="searchbar"
      type="text"
      name="searchbar"
      placeholder="Unesite naziv artikla"
      onChange={(e) => {
        console.log("e.target", e.target.value);
        setSearchValue(e.target.value);
      }}
      value={searchValue}
    />
  );
};

export default Searchbar;
