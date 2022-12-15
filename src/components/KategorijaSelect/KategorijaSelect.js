import React, { useState, useEffect } from "react";

import { Select } from "antd";
import { connect } from "react-redux";

import { useQuery } from "react-query";
import { getAllCategories } from "../../api";

import { categorySelect } from "../../redux/actions/search.action";

const KategorijaSelect = (props) => {
  const { Option } = Select;

  const [kategorija, setKategorija] = useState([]);

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
    <Select
      style={{ width: 200 }}
      showSearch
      placeholder="Izaberite kategoriju"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      <Option value={null}>Sve</Option>
      {isSuccess &&
        data.map((item) => {
          return <Option value={item.id}>{item.naziv}</Option>;
        })}
    </Select>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (item) => dispatch(categorySelect(item)),
  };
};

export default connect(null, mapDispatchToProps)(KategorijaSelect);
