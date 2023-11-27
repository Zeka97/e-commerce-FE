import styled from "styled-components";

import { Input, Select } from "antd";

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

export const CustomInput = styled(Input)`
  border-radius: 25px;
  background-color: #f0f0f0;
  border: none;
  width: 577px;
  height: 40px;
  &:hover {
    border: none;
  }
  &:focus {
    box-shadow: none !important;
    border: none;
    outline: none !important;
  }
  &.ant-input-affix-wrapper-focused {
    box-shadow: none !important;
    border: none;
    outline: none !important;
  }
  & > input {
    background-color: #f0f0f0;
  }
`;
