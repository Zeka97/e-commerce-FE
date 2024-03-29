import React from "react";
import { Link } from "react-router-dom";

import "./AdminHeader.css";

const AdminHeader = () => {
  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="admin-navbar-container">
        <img
          src="../logoshop.png"
          width="100px"
          style={{ objectFit: "contain", marginLeft: "60px" }}
          alt="logo"
        />
        <div className="admin-routes">
          <Link to="/admin/dashboard">Statistika</Link>
          <Link to="/admin/users">Kupci</Link>
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
