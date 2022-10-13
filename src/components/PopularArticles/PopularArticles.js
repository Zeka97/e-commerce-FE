import React from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../../api";
import { popularSelectOnly } from "../../redux/actions/search.action";
import LandingPageArticles from "../LandingPageArticles/LandingPageArticles";

import "./PopularArticles.css";

const PopularArticles = (props) => {
  const navigate = useNavigate();

  const { data, error, isError, isSuccess, isFetching, refetch } = useQuery(
    "popular",
    () => getArticles({ limit: 6, popular: true }),
    {
      retry: true,
    }
  );
  const showAllPopular = () => {
    props.selectPopular(true);
    navigate("/artikli");
  };

  return (
    <LandingPageArticles
      onClick={showAllPopular}
      header={"Najprodavaniji Artikli"}
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
    selectPopular: (isPopular) => dispatch(popularSelectOnly(isPopular)),
  };
};

export default connect(null, mapDispatchToProps)(PopularArticles);
