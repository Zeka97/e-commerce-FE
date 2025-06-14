import React from "react";

import { useQuery } from "react-query";
import { getAllCategories } from "../../api";
import CategoryBox from "../CategoryBox/CategoryBox";

const Categories = () => {
  const { data, refetch, isSuccess } = useQuery("getCategories", () =>
    getAllCategories({ limit: 6 })
  );

  return (
    <div className="mt-[30px] flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Kategorije</h3>
        <span className="cursor-pointer font-bold underline">Vidi sve...</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {isSuccess &&
          data.map((category) => (
            <CategoryBox {...category} refetch={refetch} />
          ))}
      </div>
    </div>
  );
};

export default Categories;
