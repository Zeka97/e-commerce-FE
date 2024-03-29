import React, { createContext, useContext, useState } from "react";
import moment from "moment";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;
  const [searchOrdersDateFrom, setSearchOrdersDateFrom] = useState(null);
  const [searchOrdersDateTo, setSearchOrdersDateTo] = useState(null);
  const [searchByCustomer, setSearchByCustomer] = useState(null);
  const [searchByCity, setSearchByCity] = useState(null);
  const [priceSort, setPriceSort] = useState(null);

  const context = {
    searchOrdersDateFrom,
    setSearchOrdersDateFrom,
    searchOrdersDateTo,
    setSearchOrdersDateTo,
    searchByCustomer,
    setSearchByCustomer,
    searchByCity,
    setSearchByCity,
    priceSort,
    setPriceSort,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useSearchContext = () => useContext(Context);
