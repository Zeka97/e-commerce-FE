import React, { useEffect, useState } from "react";
import "./pocetna.css";

import { useSelector, useDispatch } from "react-redux";

import axios from "../../components/Axios/axios";
import Card from "../../components/card/Card";
import Header from "../../components/Header/header";
import Searchbar from "../../components/Searchbar/searchbar";
import KategorijaSelect from "../../components/KategorijaSelect/KategorijaSelect";

const PocetnaPage = () => {
  const [artikli, setArtikli] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const state = useSelector((state) => state);
  console.log(state);

  const getArticles = () => {
    axios
      .get("/artikli", {
        params: {
          searchValue: searchValue,
        },
      })
      .then((res) => {
        setArtikli(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getArticles();
  }, [searchValue]);
  console.log(artikli);
  return (
    <div className="pocetna_page">
      <Header />
      <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <KategorijaSelect
        artikli={artikli}
        setArtikli={setArtikli}
        searchValue={searchValue}
      />
      <div className="artikli">
        {artikli &&
          artikli.map((item) => {
            return <Card item={item} key={item.artikal_id} />;
          })}
      </div>
    </div>
  );
};

export default PocetnaPage;
