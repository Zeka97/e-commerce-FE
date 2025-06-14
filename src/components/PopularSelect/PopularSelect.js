import React from "react";
import { useFilter } from "../../context/FilterContext";

import "./PopularSelect.css";
import { CustomSelect } from "../../styledComponents/styled";

const PopularSelect = (props) => {
  const { Option } = CustomSelect;
  const { setPopular } = useFilter();

  const onChange = (value) => {
    setPopular(value);
  };

  return (
    <CustomSelect
      showSearch
      placeholder="Popularni"
      optionFilterProp="children"
      className="w-full"
      onChange={onChange}
      defaultValue={props.value}
    >
      <Option value={true}>DA</Option>
      <Option value={null}>NE</Option>
    </CustomSelect>
  );
};

export default PopularSelect;
