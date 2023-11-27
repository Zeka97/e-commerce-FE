import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import "./DiscountSelect.css";
import { discountSelect } from "../../redux/actions/search.action";
import { CustomSelect } from "../../styledComponents/styled";

const DiscountSelect = (props) => {
  const { Option } = CustomSelect;

  const onChange = (value) => {
    props.select(value);
  };

  return (
    <CustomSelect
      showSearch
      placeholder="Akcija"
      className="w-[274px]"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={props.defaultValue}
    >
      <Option value={true}>DA</Option>
      <Option value={null}>NE</Option>
    </CustomSelect>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (item) => dispatch(discountSelect(item)),
  };
};

export default connect(null, mapDispatchToProps)(DiscountSelect);
