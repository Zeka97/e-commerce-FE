import React, { useState, useEffect } from "react";
import "./searchbar.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { CustomInput } from "../../styledComponents/styled";

const Searchbar = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <CustomInput
        type="text"
        name="searchbar"
        placeholder="Search for products..."
        onChange={(e) => {
          console.log("e.target", e.target.value);
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        prefix={<SearchOutlined />}
      />
    </>
  );
};

export default Searchbar;
