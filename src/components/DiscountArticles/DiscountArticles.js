import React from "react";
import { useQuery } from "react-query";
import { useFilter } from "../../context/FilterContext";
import { useNavigate } from "react-router-dom";

import { getArticles } from "../../api";
import LandingPageArticles from "../LandingPageArticles/LandingPageArticles";

const DiscountArticles = (props) => {
  const navigate = useNavigate();
  const { setDiscountOnly } = useFilter();

  const { data, error, isError, isSuccess, isFetching, refetch } = useQuery(
    "discount",
    () => getArticles({ limit: 5, discount: true }),
    {
      retry: true,
    }
  );

  const showAllDiscount = () => {
    setDiscountOnly(true);
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

export default DiscountArticles;
