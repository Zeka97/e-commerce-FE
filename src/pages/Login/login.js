import React, { useState } from "react";
import { adminLogin, userLogin } from "../../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { useMutation } from "react-query";
import { login } from "../../api";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { mutate } = useMutation((params) => login(params));

  const onSubmit = (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          if (data.user) {
            dispatch(userLogin(data.user));
            localStorage.setItem(
              "user",
              JSON.stringify({
                admin: null,
                currentUser: data.user,
                isLogged: true,
              })
            );
          } else {
            dispatch(adminLogin(data.admin));
            localStorage.setItem(
              "user",
              JSON.stringify({
                admin: data.admin,
                currentUser: null,
                isLogged: true,
              })
            );
          }
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
  };

  return (
    <div className="login_page">
      <div className="image">E-Trgovina</div>
      <div className="sign-in">
        <h1>Sign In</h1>
        <form onSubmit={(e) => onSubmit(e)}>
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
