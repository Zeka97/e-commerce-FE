import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../../pages/Admin/Dashboard/dashboard";
import CheckoutPage from "../../pages/checkout/CheckoutPage";
import NarduzbePage from "../../pages/Narudzbe/narudzbe";
import PocetnaPage from "../../pages/Pocetna/pocetna";
import AdminPrivateRoute from "../AdminPrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "../UserPrivateRoute/UserPrivateRoute";
import Login from "../../pages/Login/login";

import "./CustomRoutes.css";
import Signup from "../../pages/Signup/signup";
import NaslovnaPage from "../../pages/Naslovna/NaslovnaPage";

const CustomRoutes = () => {
  const user = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPrivateRoute />}>
          <Route path="/" element={<PocetnaPage />} />
        </Route>
        <Route path="/naslovna" element={<UserPrivateRoute />}>
          <Route path="/naslovna" element={<NaslovnaPage />} />
        </Route>
        <Route path="/narudzbe" element={<UserPrivateRoute />}>
          <Route path="/narudzbe" element={<NarduzbePage />} />
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
