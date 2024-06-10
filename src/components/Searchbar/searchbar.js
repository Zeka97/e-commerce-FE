import React, { useState, useEffect } from "react";
import "./searchbar.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { CustomAutocomplete } from "../../styledComponents/styled";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ searchValue, setSearchValue, data, isFetched }) => {
  const navigate = useNavigate();

  const renderItem = (item) => ({
    value: item.title,
    label: (
      <div
        className="flex justify-between items-center"
        onClick={() => navigate(`/artikli/${item.id}`)}
      >
        <div className="flex gap-8">
          <img src={item.photo} className="w-100 h-100" />
          <span className="font-bold">{item.naziv}</span>
        </div>
        <span className="font-bold">
          {item.akcijska_cijena || item.cijena} KM
        </span>
      </div>
    ),
  });

  return (
    <>
      <CustomAutocomplete
        type="text"
        name="searchbar"
        placeholder="Search for products..."
        onChange={(e) => {
          setSearchValue(e);
        }}
        {...(data &&
          searchValue.length > 2 && {
            options: data.map((item) => renderItem(item)),
          })}
        notFoundContent={
          searchValue.length < 3 ? "Enter atleast 3 characters..." : "Not found"
        }
      />
    </>
  );
};

export default Searchbar;
