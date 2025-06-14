import React from "react";

import "./DiscountSelect.css";
import { CustomSelect } from "../../styledComponents/styled";
import { useFilter } from "../../context/FilterContext";

const DiscountSelect = (props) => {
  const { Option } = CustomSelect;
  const { setDiscount } = useFilter();

  const onChange = (value) => {
    setDiscount(value);
  };

  return (
    <CustomSelect
      showSearch
      placeholder="Akcija"
      className="w-full"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={props.value}
    >
      <Option value={true}>DA</Option>
      <Option value={null}>NE</Option>
    </CustomSelect>
  );
};

export default DiscountSelect;
