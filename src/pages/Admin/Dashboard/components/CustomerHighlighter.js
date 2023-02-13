import React from "react";
import Highlighter from "react-highlight-words";
import { useSearchContext } from "../../../../components/context/SearchContext";

const CustomerHighlighter = ({ text }) => {
  const { searchByCustomer } = useSearchContext();
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
      searchWords={(searchByCustomer || "").split()}
      autoEscape
      textToHighlight={text?.toString() || ""}
    />
  );
};

export default CustomerHighlighter;
