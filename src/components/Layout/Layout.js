import React from "react";

import Header from "../Header/header";
import AdminHeader from "../AdminHeader/AdminHeader";

import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="layout">
      {user.admin ? <AdminHeader /> : user.currentUser ? <Header /> : null}
      {children}
    </div>
  );
};

export default Layout;
