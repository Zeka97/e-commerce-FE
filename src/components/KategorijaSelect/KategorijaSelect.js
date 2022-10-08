import React, { useState, useEffect } from "react";

import { Select } from "antd";

import axios from "../../components/Axios/axios";

const KategorijaSelect = ({ artikli, setArtikli, searchValue }) => {
  const { Option } = Select;

  const [kategorija, setKategorija] = useState([]);

  const onChange = (value) => {
    axios
      .get(`/kategorije/${value}`, {
        params: {
          searchValue: searchValue,
        },
      })
      .then((result) => setArtikli(result.data))
      .catch((err) => console.log(err));
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  useEffect(() => {
    axios
      .get("/kategorije")
      .then((result) => setKategorija(result.data))
      .catch((err) => console.log(err));
  }, []);

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
      {kategorija.length &&
        kategorija.map((item) => {
          return <Option value={item.id}>{item.naziv}</Option>;
        })}
    </Select>
  );
};

export default KategorijaSelect;
