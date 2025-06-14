import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import "./AdminHeader.css";

const AdminHeader = () => {
  const { logout } = useUser();

  const logOut = () => {
    logout();
    window.location.href("/login");
  };

  return (
    <div className="w-full items-center bg-[#0094bf] flex justify-center h-[120px]">
      <div className="h-[60px] rounded-[15px] w-[80%] flex items-center bg-[#0286b1]">
        <img
          src="/logoshop.png"
          width="100px"
          style={{ objectFit: "contain", marginLeft: "60px" }}
          alt="logo"
        />
        <div className="mx-auto flex gap-[80px] [&>a]:text-white [&>a]:flex [&>a]:items-center">
          <Link to="/admin/dashboard">Statistika</Link>
          <div className="flex items-center text-white  [&>a]:text-white">
            <UserOutlined style={{ color: "white" }} />
            <Link to="/admin/users">Kupci</Link>
          </div>
          <Link to="/admin/articles">Artikli</Link>
          <Link to="/admin/categories">Kategorije</Link>
          <Link to="#" onClick={logOut}>
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
