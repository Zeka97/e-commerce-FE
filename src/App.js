import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CustomRoutes from "./components/Routes/CustomRoutes";
import ContextProvider from "./components/context/Provider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <CustomRoutes />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
