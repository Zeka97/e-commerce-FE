import React from "react";

import { useSearchContext } from "../../../../components/context/SearchContext";

const PriceSorting = () => {
  const { priceSort, setPriceSort } = useSearchContext();
  return (
    <div style={{ cursor: "pointer" }}>
      <h5
        {...(!priceSort && {
          style: { backgroundColor: "#0591AF", color: "white" },
        })}
        onClick={() => setPriceSort(null)}
      >
        None
      </h5>
      <h5
        {...(priceSort == "asc" && {
          style: { backgroundColor: "#0591AF", color: "white" },
        })}
        onClick={() => setPriceSort("asc")}
      >
        Ascending
      </h5>
      <h5
        {...(priceSort == "desc" && {
          style: { backgroundColor: "#0591AF", color: "white" },
        })}
        onClick={() => setPriceSort("desc")}
      >
        Descending
      </h5>
    </div>
  );
};

export default PriceSorting;
