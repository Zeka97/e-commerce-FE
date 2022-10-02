import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PocetnaPage from "./pages/Pocetna/pocetna";
import "./App.css";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import CheckoutPage from "./pages/checkout/checkout.component";
import Login from "./pages/Login/login";
import UserPrivateRoute from "./components/UserPrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute/AdminPrivateRoute";
import Dashboard from "./pages/Admin/Dashboard/dashboard";
import Signup from "./pages/Signup/signup";
import NarduzbePage from "./pages/Narudzbe/narudzbe";

function App() {
  const user = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserPrivateRoute />}>
            <Route path="/" element={<PocetnaPage />} />
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
    </div>
  );
}

export default App;
