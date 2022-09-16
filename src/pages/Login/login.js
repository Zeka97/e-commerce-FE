import axios from "../../components/Axios/axios";
import React, { useState } from "react";
import { adminLogin, userLogin } from "../../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const onSubmit = (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    console.log(username, password);
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setErrorMessage(res.data.message);
        } else {
          if (res.data.user) {
            dispatch(userLogin(res.data.user));
            localStorage.setItem(
              "user",
              JSON.stringify({
                admin: null,
                currentUser: res.data.user,
                isLogged: true,
              })
            );
          } else {
            dispatch(adminLogin(res.data.admin));
            localStorage.setItem(
              "user",
              JSON.stringify({
                admin: res.data.admin,
                currentUser: null,
                isLogged: true,
              })
            );
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_page" onSubmit={(e) => onSubmit(e)}>
      <div className="image">E-Trgovina</div>
      <div className="sign-in">
        <h1>Sign In</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot password?</a>
          <input type="submit" value="Sign In" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Login;
