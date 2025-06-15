import React from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <div
      className="flex w-full h-auto flex-col justify-between border border-[#f5f5f5] bg-white border-none rounded-[8px] grow"
      key={item.id}
    >
      <img
        className="flex w-[150px] h-[150px] bg-cover m-auto"
        src={
          item.photo.startsWith("uploads")
            ? `${process.env.REACT_APP_BASE_URL}/${item.photo}`
            : item.photo
        }
        alt={`slika proizvoda ${item.naziv}`}
      />
      <div className="flex flex-row justify-between px-[20px] py-[12px]">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {item.naziv.slice(0, 20) + "..."}
          </span>
          {item.akcijska_cijena ? (
            <div className="cijena">
              <span className="text-sm line-through mr-2">{item.cijena}$</span>
              <span className="text-sm font-medium akcija">
                <b>{item.akcijska_cijena}$</b>
              </span>
            </div>
          ) : (
            <span className="text-sm font-medium">
              <b>{item.cijena}$</b>
            </span>
          )}
        </div>
        <div className="flex justify-center items-center text-base font-medium">
          <span
            className="bg-black text-white px-8 py-2 rounded-md cursor-pointer"
            onClick={
              user?.isAdmin
                ? () => navigate(`/admin/articles/${item.id}`)
                : () => navigate(`/artikli/${item.id}`)
            }
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
