import React, { useState } from "react";
import "./header.css";

import Searchbar from "../Searchbar/searchbar";
import Avatar from "../Avatar/avatar";
import Cart from "../Cart/cart";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex w-full h-64 bg-white justify-center">
      <div className="flex items-center h-20 w-full max-w-[1400px]">
        <img
          src="../logoshop.png"
          className="mr-128"
          width="100px"
          style={{ objectFit: "contain" }}
          alt="logo"
        />
        <div className="flex gap-64 mr-64 items-center">
          <Link className="text-black" to="/">
            Pocetna
          </Link>
          <Link className="text-black" to="/kategorije">
            Kategorija
          </Link>
          <Link className="text-black" to="/artikli">
            Artikli
          </Link>
        </div>
        <Searchbar />
        <div className="dropdown_items ml-64 gap-24 flex justify-end flex-grow">
          <Cart />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default Header;
