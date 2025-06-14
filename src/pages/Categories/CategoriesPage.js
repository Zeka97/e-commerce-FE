import React from "react";
import { useQuery } from "react-query";
import { getAllCategories } from "../../api";
import CategoryBox from "../../components/CategoryBox/CategoryBox";

import "./CategoriesPage.css";

const CategoriesPage = () => {
  const { data, isFetching, refetch, isSuccess } = useQuery(
    "kategorije",
    getAllCategories
  );

  return (
    <div className="categories_page">
      <div className="content_box">
        <h3>Sve kategorije</h3>
        <div className="categories_list">
          {isSuccess &&
            data.map((category) => (
              <CategoryBox key={category.id} {...category} refetch={refetch} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
