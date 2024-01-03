import React from "react";

import { Select } from "antd";
import { connect } from "react-redux";

import "./PopularSelect.css";
import { popularSelect } from "../../redux/actions/search.action";
import { CustomSelect } from "../../styledComponents/styled";

const PopularSelect = (props) => {
  const { Option } = CustomSelect;

  const onChange = (value) => {
    props.select(value);
  };

  return (
    <CustomSelect
      showSearch
      placeholder="Popularni"
      optionFilterProp="children"
      className="w-full"
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
    select: (item) => dispatch(popularSelect(item)),
  };
};

export default connect(null, mapDispatchToProps)(PopularSelect);
