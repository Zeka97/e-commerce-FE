import React, { useEffect, useState } from "react";
import "./pocetna.css";

import { useSelector, useDispatch } from "react-redux";

import axios from "../../components/Axios/axios";
import Card from "../../components/card/Card";
import Header from "../../components/Header/header";

const PocetnaPage = () => {
  const [artikli, setArtikli] = useState(null);
  const state = useSelector((state) => state);
  console.log(state);
  const getArticles = () => {
    axios
      .get("/artikli")
      .then((res) => setArtikli(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getArticles();
  }, []);
  console.log(artikli);
  console.log();
  return (
    <div className="pocetna_page">
      <Header />
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
