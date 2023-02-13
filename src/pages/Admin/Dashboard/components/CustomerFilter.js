import React from "react";

import { useSearchContext } from "../../../../components/context/SearchContext";
import FilterDropdown from "../../../../components/FilterDropdown";

const CustomerFilter = ({ confirm }) => {
  const { searchByCustomer, setSearchByCustomer } = useSearchContext();

  return (
    <FilterDropdown
      filterValue={searchByCustomer}
      setFilterValue={setSearchByCustomer}
      placeholder="Traži po nazivu kucpa"
      confirm={confirm}
    />
  );
};

export default CustomerFilter;
