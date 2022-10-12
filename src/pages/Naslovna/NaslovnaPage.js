import React from "react";
import { useQuery } from "react-query";
import { getArticles } from "../../api";
import Card from "../../components/card/Card";
import Categories from "../../components/Categories/Categories";
import DiscountArticles from "../../components/DiscountArticles/DiscountArticles";
import Header from "../../components/Header/header";
import PopularArticles from "../../components/PopularArticles/PopularArticles";
import "./NaslovnaPage.css";

const NaslovnaPage = () => {
  return (
    <div class="naslovna_page">
      <Header />
      <div className="naslovna_content">
        <DiscountArticles />
        <Categories />
        <PopularArticles />
      </div>
    </div>
  );
};

export default NaslovnaPage;
