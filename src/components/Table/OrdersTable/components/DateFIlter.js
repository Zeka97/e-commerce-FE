import React from "react";
import moment from "moment";

import { useSearchContext } from "../../../context/SearchContext";

import DateRange from "../../../DateRangePicker";

const UserOrdersDateFilter = ({ confirm }) => {
  const {
    searchOrdersDateFrom,
    setSearchOrdersDateFrom,
    searchOrdersDateTo,
    setSearchOrdersDateTo,
  } = useSearchContext();

  return (
    <DateRange
      key={2}
      dateFrom={searchOrdersDateFrom}
      setDateFrom={setSearchOrdersDateFrom}
      dateTo={searchOrdersDateTo}
      setDateTo={setSearchOrdersDateTo}
    />
  );
};

export default UserOrdersDateFilter;
