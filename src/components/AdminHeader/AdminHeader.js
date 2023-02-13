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
      <div className="navbar-container">
        <Link to="/admin/dashboard">Statistika</Link>
        <Link to="/admin/users">Kupci</Link>
        <Link to="/admin/articles">Artikli</Link>
        <Link to="/admin/categories">Kategorije</Link>
        <Link to="#" onClick={logOut}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
