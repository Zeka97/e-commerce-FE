import React, { useState, useEffect } from "react";

import { Select } from "antd";

import axios from "../../components/Axios/axios";

const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const KategorijaSelect = (props) => {
  const [kategorije, setKategorije] = useState([]);

  useEffect(() => {
    axios
      .get("/kategorije")
      .then((result) => setKategorije(result.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(kategorije);

  return (
    <Select
      showSearch
      placeholder="Izaberite kategoriju"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {kategorije.length &&
        kategorije.map((item) => {
          return <Option value={item.id}>{item.naziv}</Option>;
        })}
    </Select>
  );
};

export default KategorijaSelect;
