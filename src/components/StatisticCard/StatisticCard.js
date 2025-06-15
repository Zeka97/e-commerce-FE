import React from "react";

import NumberCounter from "number-counter";

import { Spin, Tag } from "antd";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const StatisticCard = ({ header, desc, statisticChange, isFetched }) => {
  const isPositive = statisticChange >= 0;
  const ArrowIcon = isPositive ? ArrowUpOutlined : ArrowDownOutlined;
  const tagColor = isPositive ? "green" : "red";
  const changeValue = Math.abs(statisticChange);

  return (
    <div className="w-[190px] h-[190px] rounded-[5px] pl-8 shadow-[0_5px_15px_rgba(0,0,0,0.35)] flex justify-center flex-col pl-5">
      <h3 className="font-bold text-[20px]">{header}</h3>

      {isFetched ? (
        <div className=" flex flex-col justify-center">
          <b>
            <NumberCounter end={parseInt(desc)} delay={0.2} />
          </b>
          <div className="flex">
            <Tag color={tagColor}>
              <ArrowIcon />
              <span>
                <b>{changeValue} %</b>
              </span>
            </Tag>
            <span>since last month</span>
          </div>
        </div>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default StatisticCard;
