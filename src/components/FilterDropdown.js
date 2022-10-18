import React, { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const FilterDropdown = ({
  filterValue,
  setFilterValue,
  placeholder,
  confirm,
}) => {
  const [value, setValue] = useState(filterValue);

  const handleOk = (e) => {
    if (e) e.preventDefault();
    setFilterValue(value);
    confirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={handleOk}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90, marginRight: 8 }}
        onClick={handleOk}
      >
        Traži
      </Button>
      <Button
        size="small"
        style={{ width: 90 }}
        onClick={(e) => {
          e.preventDefault();
          setValue(null);
          setFilterValue(null);
          confirm();
        }}
      >
        Resetuj
      </Button>
    </div>
  );
};

export default FilterDropdown;
