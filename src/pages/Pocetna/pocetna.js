import React, { useEffect, useState } from "react";
import "./pocetna.css";

import { connect } from "react-redux";

import Card from "../../components/card/Card";
import Header from "../../components/Header/header";
import Searchbar from "../../components/Searchbar/searchbar";
import KategorijaSelect from "../../components/KategorijaSelect/KategorijaSelect";
import { useQuery } from "react-query";
import { getArticles } from "../../api";

const PocetnaPage = (props) => {
  const [searchValue, setSearchValue] = useState("");

  console.log(props.filter);

  const { data, error, isError, isSuccess, isFetching, refetch } = useQuery(
    "articles",
    () =>
      getArticles({
        searchValue,
        kategorija_id: props.filter.category,
        discount: props.filter.discount,
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
  ]);
  return (
    <div className="pocetna_page">
      <Header />
      <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <KategorijaSelect />
      <div className="artikli">
        {isSuccess &&
          data.map((item) => {
            return <Card item={item} key={item.id} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(PocetnaPage);
