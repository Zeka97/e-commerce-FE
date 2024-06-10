import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { useQuery } from "react-query";
import { getAllCategories } from "../../api";

import { categorySelect } from "../../redux/actions/search.action";
import { CustomSelect } from "../../styledComponents/styled";

const KategorijaSelect = (props) => {
  const { Option } = CustomSelect;

  const { data, error, isError, isFetching, isLoading, isSuccess } = useQuery(
    "getAllCategories",
    getAllCategories
  );

  const onChange = (value) => {
    props.select(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <CustomSelect
      showSearch
      placeholder="Izaberite kategoriju"
      className="w-full"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      defaultValue={props.defaultValue}
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

const mapDispatchToProps = (dispatch) => {
  return {
    select: (item) => dispatch(categorySelect(item)),
  };
};

export default connect(null, mapDispatchToProps)(KategorijaSelect);
