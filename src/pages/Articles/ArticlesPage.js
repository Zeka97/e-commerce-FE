import React, { useEffect, useState } from "react";
import "./ArticlesPage.css";

import { connect } from "react-redux";
import { Slider } from "antd";

import Card from "../../components/card/Card";
import Header from "../../components/Header/header";
import Searchbar from "../../components/Searchbar/searchbar";
import KategorijaSelect from "../../components/KategorijaSelect/KategorijaSelect";
import { useQuery } from "react-query";
import { getArticles } from "../../api";
import DiscountSelect from "../../components/DiscountSelect/DiscountSelect";
import PopularSelect from "../../components/PopularSelect/PopularSelect";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const ArticlesPage = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  console.log(props.filter);
  console.log(props.user);

  const { data, error, isError, isSuccess, isFetching, isLoading, refetch } =
    useQuery(
      "articles",
      () =>
        getArticles({
          searchValue,
          kategorija_id: props.filter.category,
          discount: props.filter.discount,
          popular: props.filter.popular,
          priceRange,
        }),
      {
        retry: true,
      }
    );

  useEffect(() => {
    refetch();
  }, [
    searchValue,
    props.filter.category,
    props.filter.popular,
    props.filter.discount,
    priceRange,
  ]);

  const marks = {
    0: "0",
    25: "15",
    50: "50",
    75: "75",
    100: "100",
  };
  return (
    <div className="articles_page">
      {props.user ? <Header /> : <AdminHeader />}
      <div className="filter">
        <div className="select">
          <label>Kljucna rijec</label>
          <Searchbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="select">
          <label>Kategorija</label>
          <KategorijaSelect />
        </div>
        <div className="select">
          <label>Akcija</label>
          <DiscountSelect />
        </div>
        <div className="select">
          <label>Popular</label>
          <PopularSelect />
        </div>
        <div className="select">
          <label style={{ marginLeft: "50px" }}>Cijena</label>
          <Slider
            defaultValue={[0, 100]}
            range
            style={{
              width: "300px",
              margin: 0,
              display: "inline-block",
              marginLeft: "60px",
            }}
            marks={marks}
            onChange={(value) => setPriceRange(value)}
          />
        </div>
      </div>
      <div className="articles_list">
        <h3>Svi artikli</h3>
        <div className="artikli">
          {isSuccess &&
            data.map((item) => {
              return <Card item={item} key={item.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(ArticlesPage);
