import React from "react";
import Card from "../card/Card";

const LandingPageArticles = (props) => {
  return (
    <div className="mt-[30px] flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">{props.header}</h3>
        <span
          className="cursor-pointer underline font-bold"
          onClick={props.onClick}
        >
          Vidi sve...
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {props.isSuccess &&
          props.data?.articles?.map((item) => (
            <Card id={item.id} item={item} />
          ))}
        {!props.data?.articles?.length && (
          <div className="text-gray-500 font-semibold">
            Nema artikala na popustu
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPageArticles;
