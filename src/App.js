import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CustomRoutes from "./components/Routes/CustomRoutes";
import ContextProvider from "./components/context/Provider";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <BrowserRouter>
          <Layout>
            <CustomRoutes />
          </Layout>
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
