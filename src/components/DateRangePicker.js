import React, { useState } from "react";
import moment from "moment";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

const DateRange = (props) => {
  const handleSelect = (item) => {
    props.setDateFrom(item.selection.startDate);
    props.setDateTo(item.selection.endDate);
  };

  const selectionRange = {
    startDate: props.dateFrom,
    endDate: props.dateTo,
    key: "selection",
  };
  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={(item) => handleSelect(item)}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      direction="horizontal"
    />
  );
};

export default DateRange;
