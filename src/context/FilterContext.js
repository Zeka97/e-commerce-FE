import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [category, setCategory] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [popular, setPopular] = useState(null);

  // 'Only' setters clear the other filters
  const setCategoryOnly = (value) => {
    setCategory(value);
    setDiscount(null);
    setPopular(null);
  };
  const setDiscountOnly = (value) => {
    setDiscount(value);
    setCategory(null);
    setPopular(null);
  };
  const setPopularOnly = (value) => {
    setPopular(value);
    setCategory(null);
    setDiscount(null);
  };

  return (
    <FilterContext.Provider
      value={{
        category,
        discount,
        popular,
        setCategory,
        setDiscount,
        setPopular,
        setCategoryOnly,
        setDiscountOnly,
        setPopularOnly,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
