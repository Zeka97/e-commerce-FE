import React from "react";

import { Select } from "antd";
import { connect } from "react-redux";

import "./PopularSelect.css";
import { popularSelect } from "../../redux/actions/search.action";

const PopularSelect = (props) => {
  const { Option } = Select;

  const onChange = (value) => {
    props.select(value);
  };

  return (
    <Select
      showSearch
      placeholder="Popularni"
      optionFilterProp="children"
      onChange={onChange}
    >
      <Option value={true}>DA</Option>
      <Option value={null}>NE</Option>
    </Select>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (item) => dispatch(popularSelect(item)),
  };
};

export default connect(null, mapDispatchToProps)(PopularSelect);
