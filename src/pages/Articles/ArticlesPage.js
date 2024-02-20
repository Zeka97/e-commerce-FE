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
import EditArticleModal from "../Article/components/EditArticleModal/EditArticleModal";

const ArticlesPage = (props) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [isOpenAddArticleModal, setIsOpenAddArticleModal] = useState(false);

  const { data, error, isError, isSuccess, isFetching, isLoading, refetch } =
    useQuery(
      "articles",
      () =>
        getArticles({
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

  console.log(articles);
  useEffect(() => {
    if (page == 1) setTimeout(() => refetch(), 1000);
    else setPage(1);
  }, [
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
    <>
      <div className="articles_page mx-32 pt-16">
        <div className="filter">
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
            <label>Cijena</label>
            <div className="flex items-center h-full">
              <Slider
                defaultValue={[0, 100]}
                range
                style={{
                  width: "100%",
                  margin: 0,
                  display: "inline-block",
                }}
                marks={marks}
                onChange={(value) => setPriceRange(value)}
              />
            </div>
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
            {props.user === null && (
              <CustomButton
                className="black"
                style={{ marginBottom: "10px", height: "50px" }}
                onClick={() => setIsOpenAddArticleModal(true)}
              >
                Dodaj artikal
              </CustomButton>
            )}
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
              articles.map((item, index) => {
                return (
                  <Card
                    item={item}
                    key={item.id}
                    index={index}
                    arrLen={articles.length}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <EditArticleModal
        editArticleModal={isOpenAddArticleModal}
        setArticleModal={setIsOpenAddArticleModal}
        newArticle
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(ArticlesPage);
