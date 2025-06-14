import React from "react";
import Header from "../Header/header";
import AdminHeader from "../AdminHeader/AdminHeader";
import { useUser } from "../../context/UserContext";
import { Spin } from "antd";

const Layout = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col w-full items-center">
      <div className="max-w-[1500px] w-full">
        {user && user?.isAdmin ? (
          <AdminHeader />
        ) : user && !user?.isAdmin ? (
          <Header />
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Layout;
