import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const user = useSelector((state) => state.auth);

  return !user.admin ? <Navigate to="/login" /> : <Outlet />;
};

export default AdminPrivateRoute;
