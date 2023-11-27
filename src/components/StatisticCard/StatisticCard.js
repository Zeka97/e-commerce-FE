import React from "react";

import NumberCounter from "number-counter";

import { Spin, Tag } from "antd";

import "./StatisticCard.css";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const StatisticCard = (props) => {
  return (
    <div className="statistic-box">
      <div className="statistic-box_header">
        <h3 className="font-bold text-[20px]">{props.header}</h3>
      </div>
      {props.isFetched ? (
        <div className="description">
          <b>
            <NumberCounter end={parseInt(props.desc)} delay={0.2} />
          </b>
          {props.statisticChange >= 0 ? (
            <div className="flex">
              <Tag color="green">
                <ArrowUpOutlined />
                <span>
                  <b>{props.statisticChange} %</b>
                </span>
              </Tag>
              <span>since last month</span>
            </div>
          ) : (
            <div className="flex mt-12">
              <Tag color="red">
                <ArrowDownOutlined />
                <span>
                  <b>{Math.abs(props.statisticChange)} %</b>
                </span>
              </Tag>
              <span>since last month</span>
            </div>
          )}
        </div>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default StatisticCard;
