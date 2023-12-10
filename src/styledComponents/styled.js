import styled from "styled-components";

import { AutoComplete, Select } from "antd";

export const CustomSelect = styled(Select)`
  &.ant-select > .ant-select-selector {
    border-radius: 5px;
    padding: 8px 12px;
    border: none;
    height: auto;
  }
  &.ant-select > .ant-select-selector > .ant-select-selection-search {
    padding: 8px 0px;
  }
`;

export const CustomAutocomplete = styled(AutoComplete)`
  .ant-select-selector {
    border-radius: 25px !important;
    background-color: #f0f0f0 !important;
    border: none !important;
    width: 577px !important;
    height: 40px !important;
    box-shadow: none !important;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
  }
  .ant-select-selection-placeholder {
    display: flex;
    align-items: center;
  }
`;
