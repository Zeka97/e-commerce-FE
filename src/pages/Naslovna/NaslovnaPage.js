import React from "react";
import Categories from "../../components/Categories/Categories";
import DiscountArticles from "../../components/DiscountArticles/DiscountArticles";
import PopularArticles from "../../components/PopularArticles/PopularArticles";

const NaslovnaPage = () => {
  return (
    <div>
      <DiscountArticles />
      <Categories />
      <PopularArticles />
    </div>
  );
};

export default NaslovnaPage;
