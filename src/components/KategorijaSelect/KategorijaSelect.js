import React from "react";

import { useQuery } from "react-query";
import { getAllCategories } from "../../api";

import { CustomSelect } from "../../styledComponents/styled";
import { useFilter } from "../../context/FilterContext";

const KategorijaSelect = (props) => {
  const { Option } = CustomSelect;

  const { data, isSuccess } = useQuery("getAllCategories", getAllCategories);

  const { setCategory } = useFilter();

  const onChange = (value) => {
    setCategory(value);
  };

  return (
    <CustomSelect
      showSearch
      placeholder="Izaberite kategoriju"
      className="w-full"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={props.value}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      <Option value={null}>Sve</Option>
      {isSuccess &&
        data.map((item) => {
          return <Option value={item.id}>{item.naziv}</Option>;
        })}
    </CustomSelect>
  );
};

export default KategorijaSelect;
