import React from "react";
import { useQuery } from "react-query";
import { getAllCategories } from "../../api";
import CategoryBox from "../../components/CategoryBox/CategoryBox";

const CategoriesPage = () => {
  const { data, isFetching, refetch, isSuccess } = useQuery(
    "kategorije",
    getAllCategories
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mt-[100px] w-[90%]">
        <h3>Sve kategorije</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
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
