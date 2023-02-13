import React from "react";

import { useSearchContext } from "../../../../components/context/SearchContext";
import FilterDropdown from "../../../../components/FilterDropdown";

const CityFilter = ({ confirm }) => {
  const { searchByCity, setSearchByCity } = useSearchContext();

  return (
    <FilterDropdown
      filterValue={searchByCity}
      setFilterValue={setSearchByCity}
      placeholder="Traži po nazivu grada"
      confirm={confirm}
    />
  );
};

export default CityFilter;
