import React from "react";
import { useQuery } from "react-query";
import { useFilter } from "../../context/FilterContext";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../../api";
import LandingPageArticles from "../LandingPageArticles/LandingPageArticles";

const PopularArticles = (props) => {
  const navigate = useNavigate();
  const { setPopularOnly } = useFilter();

  const { data, error, isError, isSuccess, isFetching, refetch } = useQuery(
    "popular",
    () => getArticles({ limit: 6, popular: true }),
    {
      retry: true,
    }
  );
  const showAllPopular = () => {
    setPopularOnly(true);
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

export default PopularArticles;
