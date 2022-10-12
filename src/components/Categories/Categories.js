import React from "react";

import "./Categories.css";
import { useQuery } from "react-query";
import { getAllCategories } from "../../api";
import CategoryBox from "../CategoryBox/CategoryBox";

const Categories = () => {
  const { data, error, isError, isFetching, isLoading, isSuccess } = useQuery(
    "getCategories",
    () => getAllCategories({ limit: 6 })
  );

  return (
    <div className="Categories_box">
      <div className="Categories_header">
        <h3>Kategorije</h3>
        <span>Vidi sve...</span>
      </div>
      <div className="Categories_list">
        {isSuccess && data.map((category) => <CategoryBox {...category} />)}
      </div>
    </div>
  );
};

export default Categories;
