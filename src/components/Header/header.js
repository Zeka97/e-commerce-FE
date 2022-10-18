import React, { useState } from "react";
import "./header.css";

import Searchbar from "../Searchbar/searchbar";
import Avatar from "../Avatar/avatar";
import Cart from "../Cart/cart";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="navbar-container">
        <Link to="/">Pocetna</Link>
        <Link to="/kategorije">Kategorija</Link>
        <Link to="/artikli">Artikli</Link>
      </div>
      <div className="dropdown_items">
        <Cart />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
