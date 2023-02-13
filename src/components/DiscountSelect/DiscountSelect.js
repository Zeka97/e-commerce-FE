import React, { useState, useEffect } from "react";

import { Select } from "antd";
import { connect } from "react-redux";

import { useQuery } from "react-query";

import "./DiscountSelect.css";
import { discountSelect } from "../../redux/actions/search.action";

const DiscountSelect = (props) => {
  const { Option } = Select;

  const onChange = (value) => {
    props.select(value);
  };

  return (
    <Select
      showSearch
      placeholder="Akcija"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={props.defaultValue}
    >
      <Option value={true}>DA</Option>
      <Option value={null}>NE</Option>
    </Select>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (item) => dispatch(discountSelect(item)),
  };
};

export default connect(null, mapDispatchToProps)(DiscountSelect);
