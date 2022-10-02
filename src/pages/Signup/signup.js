import React from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

import Axios from "../../components/Axios/axios";

const Signup = () => {
  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();

    let ime = e.target[0].value;
    let prezime = e.target[1].value;
    let email = e.target[2].value;
    let username = e.target[3].value;
    let password = e.target[4].value;
    let grad = e.target[5].value;
    let adresa = e.target[6].value;
    let brojtelefona = e.target[7].value;

    Axios.post("/register", {
      ime: ime,
      prezime: prezime,
      email: email,
      username: username,
      password: password,
      grad: grad,
      adresa: adresa,
      brojtelefona: brojtelefona,
    })
      .then((res) => {
        if (res.status === 200) navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup_page" onSubmit={(e) => register(e)}>
      <form>
        <label>Ime</label>
        <input type="text" name="ime" />
        <label>Prezime</label>
        <input type="text" name="prezime" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Username</label>
        <input type="text" name="username" />
        <label>Password</label>
        <input type="password" name="password" />
        <label>Grad</label>
        <input type="text" name="grad" />
        <label>Adresa</label>
        <input type="text" name="adresa" />
        <label>Broj telefon</label>
        <input type="text" name="brojtelefona" />
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default Signup;
