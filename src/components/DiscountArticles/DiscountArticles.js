import React from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getArticles } from "../../api";
import { discountSelectOnly } from "../../redux/actions/search.action";
import LandingPageArticles from "../LandingPageArticles/LandingPageArticles";

import "./DiscountArticles.css";

const DiscountArticles = (props) => {
  const navigate = useNavigate();

  const { data, error, isError, isSuccess, isFetching, refetch } = useQuery(
    "discount",
    () => getArticles({ limit: 5, discount: true }),
    {
      retry: true,
    }
  );

  const showAllDiscount = () => {
    props.selectDiscount(true);
    navigate("/artikli");
  };

  return (
    <LandingPageArticles
      onClick={showAllDiscount}
      header={"Artikli na popustu"}
      data={data}
      error={error}
      isSuccess={isSuccess}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDiscount: (isDiscount) => dispatch(discountSelectOnly(isDiscount)),
  };
};

export default connect(null, mapDispatchToProps)(DiscountArticles);
