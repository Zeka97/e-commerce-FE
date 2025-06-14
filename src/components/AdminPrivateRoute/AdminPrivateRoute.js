import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Spin } from "antd";

const AdminPrivateRoute = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
