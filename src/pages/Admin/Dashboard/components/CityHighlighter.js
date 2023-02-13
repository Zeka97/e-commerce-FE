import React from "react";
import Highlighter from "react-highlight-words";
import { useSearchContext } from "../../../../components/context/SearchContext";

const CityHighlighter = ({ text }) => {
  const { searchByCity } = useSearchContext();
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
      searchWords={(searchByCity || "").split()}
      autoEscape
      textToHighlight={text?.toString() || ""}
    />
  );
};

export default CityHighlighter;
