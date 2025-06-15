import React from "react";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../api";
import AddCategoryBox from "../../../components/AddCategoryBox/AddCategoryBox";
import CategoryBox from "../../../components/CategoryBox/CategoryBox";

const AdminCategoriesPage = () => {
  const { data, refetch, isFetching, isSuccess } = useQuery(
    "kategorije",
    getAllCategories
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mt-[100px] w-[90%]">
        <h3>Sve kategorije</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
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
