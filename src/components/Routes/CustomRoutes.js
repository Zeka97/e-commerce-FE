import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/Admin/Dashboard/dashboard";
import CheckoutPage from "../../pages/checkout/CheckoutPage";
import ArticlesPage from "../../pages/Articles/ArticlesPage";
import AdminPrivateRoute from "../AdminPrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "../UserPrivateRoute/UserPrivateRoute";
import Login from "../../pages/Login/login";

import Signup from "../../pages/Signup/signup";
import NaslovnaPage from "../../pages/Naslovna/NaslovnaPage";
import ArticlePage from "../../pages/Article/ArticlePage";
import ProfilePage from "../../pages/Profile/ProfilePage";
import CategoriesPage from "../../pages/Categories/CategoriesPage";
import AdminArticles from "../../pages/Admin/Articles/AdminArticles";
import AdminCategoriesPage from "../../pages/Admin/Categories/AdminCategories";
import AdminUsersPage from "../../pages/Admin/Users/AdminUsersPage";
import { useUser } from "../../context/UserContext";

const CustomRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      {/* User Routes */}
      <Route element={<UserPrivateRoute />}>
        <Route path="/" element={<NaslovnaPage />} />
        <Route path="/artikli" element={<ArticlesPage />} />
        <Route path="/artikli/:id" element={<ArticlePage />} />
        <Route path="/kategorije" element={<CategoriesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/naplata" element={<CheckoutPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/articles/:id" element={<ArticlePage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
      </Route>

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          user && !user?.isAdmin ? (
            <Navigate to="/" />
          ) : user && user?.isAdmin ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          user && !user?.isAdmin ? (
            <Navigate to="/" />
          ) : user && user?.isAdmin ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Signup />
          )
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<div>ERROR 404 Page not Found</div>} />
    </Routes>
  );
};

export default CustomRoutes;
