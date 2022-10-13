import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../../pages/Admin/Dashboard/dashboard";
import CheckoutPage from "../../pages/checkout/CheckoutPage";
import ArticlesPage from "../../pages/Articles/ArticlesPage";
import AdminPrivateRoute from "../AdminPrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "../UserPrivateRoute/UserPrivateRoute";
import Login from "../../pages/Login/login";

import "./CustomRoutes.css";
import Signup from "../../pages/Signup/signup";
import NaslovnaPage from "../../pages/Naslovna/NaslovnaPage";
import ArticlePage from "../../pages/Article/ArticlePage";
import ProfilePage from "../../pages/Profile/ProfilePage";

const CustomRoutes = () => {
  const user = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPrivateRoute />}>
          <Route path="/" element={<NaslovnaPage />} />
        </Route>
        <Route path="/artikli" element={<UserPrivateRoute />}>
          <Route path="/artikli" element={<ArticlesPage />} />
        </Route>
        <Route path="/artikli/:id" element={<UserPrivateRoute />}>
          <Route path="/artikli/:id" element={<ArticlePage />} />
        </Route>
        <Route path="/profile" element={<UserPrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/naplata" element={<UserPrivateRoute />}>
          <Route path="/naplata" element={<CheckoutPage />} />
        </Route>
        <Route
          path="/login"
          element={
            user.currentUser ? (
              <Navigate to="/" />
            ) : user.admin ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            user.currentUser ? (
              <Navigate to="/" />
            ) : user.admin ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Signup />
            )
          }
        />
        <Route path="/admin/dashboard/" element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard/" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<div>ERROR 404 Page not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
