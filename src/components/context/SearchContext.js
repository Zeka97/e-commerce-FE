import React, { createContext, useContext, useState } from "react";
import moment from "moment";
import { subMonths } from "date-fns";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;
  const [searchOrdersDateFrom, setSearchOrdersDateFrom] = useState(
    subMonths(new Date(), 1)
  );
  const [searchOrdersDateTo, setSearchOrdersDateTo] = useState(new Date());

  const context = {
    searchOrdersDateFrom,
    setSearchOrdersDateFrom,
    searchOrdersDateTo,
    setSearchOrdersDateTo,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useSearchContext = () => useContext(Context);
