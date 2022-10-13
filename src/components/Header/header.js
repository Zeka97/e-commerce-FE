import React, { useState } from "react";
import "./header.css";

import Searchbar from "../Searchbar/searchbar";
import Avatar from "../Avatar/avatar";
import Cart from "../Cart/cart";
const Header = () => {
  return (
    <div className="header">
      <div className="navbar-container">
        <span>Pocetna</span>
        <span>Kategorija</span>
        <span>Artikli</span>
      </div>
      <div className="dropdown_items">
        <Cart />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
