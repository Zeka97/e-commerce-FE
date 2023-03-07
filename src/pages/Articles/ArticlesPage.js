import React, { useEffect, useState } from "react";
import "./ArticlesPage.css";

import { connect } from "react-redux";
import { Slider, Pagination } from "antd";

import Card from "../../components/card/Card";
import Header from "../../components/Header/header";
import Searchbar from "../../components/Searchbar/searchbar";
import KategorijaSelect from "../../components/KategorijaSelect/KategorijaSelect";
import { useQuery } from "react-query";
import { getArticles } from "../../api";
import DiscountSelect from "../../components/DiscountSelect/DiscountSelect";
import PopularSelect from "../../components/PopularSelect/PopularSelect";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import CustomButton from "../../components/CustomButton/CustomButton";

const ArticlesPage = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

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
          page,
          limit: 12,
        }),
      {
        retry: true,
      }
    );

  const { total, articles } = data || { total: null, articles: [] };

  useEffect(() => {
    if (page == 1) refetch();
    else setPage(1);
  }, [
    searchValue,
    props.filter.category,
    props.filter.popular,
    props.filter.discount,
    priceRange,
  ]);

  useEffect(() => {
    if (page == 1) {
      setTotalItems(total);
    }
    refetch();
  }, [page, total]);

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
          <KategorijaSelect defaultValue={props.filter.category} />
        </div>
        <div className="select">
          <label>Akcija</label>
          <DiscountSelect defaultValue={props.filter.discount} />
        </div>
        <div className="select">
          <label>Popular</label>
          <PopularSelect defaultValue={props.filter.popular} />
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "40px",
            }}
          >
            Svi artikli
          </span>
          {props.user === null &&
            <CustomButton
              className="black"
              style={{ marginBottom: "10px", height: "50px" }}
            >
              Dodaj artikal
            </CustomButton>
          }
        </div>
        <div className="pagination">
          <h4>
            Broj pronadjenih artikala je: <b>{totalItems}</b>
          </h4>
          <Pagination
            defaultCurrent={1}
            total={totalItems}
            onChange={(page) => setPage(page)}
            pageSize={12}
          />
        </div>
        <div className="artikli">
          {isSuccess &&
            articles.map((item) => {
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
