import React from "react";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../api";
import AddCategoryBox from "../../../components/AddCategoryBox/AddCategoryBox";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import CategoryBox from "../../../components/CategoryBox/CategoryBox";

import "./AdminCategories.css";

const AdminCategoriesPage = () => {
  const { data, refetch, isFetching, isSuccess } = useQuery(
    "kategorije",
    getAllCategories
  );

  return (
    <div className="categories_page">
      <div className="content_box">
        <h3>Sve kategorije</h3>
        <div className="categories_list">
          <AddCategoryBox />
          {isSuccess &&
            data.map((category) => (
              <CategoryBox key={category.id} {...category} refetch={refetch} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
