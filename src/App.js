import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CustomRoutes from "./components/Routes/CustomRoutes";
import ContextProvider from "./components/context/Provider";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { FilterProvider } from "./context/FilterContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <FilterProvider>
          <UserProvider>
            <CartProvider>
              <BrowserRouter>
                <Layout>
                  <CustomRoutes />
                </Layout>
              </BrowserRouter>
            </CartProvider>
          </UserProvider>
        </FilterProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
