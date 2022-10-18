import React from "react";
import { Provider as SearchProvider } from "./SearchContext";

const Provider = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

export default Provider;
