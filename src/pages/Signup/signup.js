import React from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { register } from "../../api";

const Signup = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation((params) => register(params));

  const registerProfile = (e) => {
    e.preventDefault();

    let ime = e.target[0].value;
    let prezime = e.target[1].value;
    let email = e.target[2].value;
    let username = e.target[3].value;
    let password = e.target[4].value;
    let grad = e.target[5].value;
    let adresa = e.target[6].value;
    let brojtelefona = e.target[7].value;

    mutate(
      {
        ime,
        prezime,
        email,
        username,
        password,
        grad,
        adresa,
        brojtelefona,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="signup_page" onSubmit={(e) => registerProfile(e)}>
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
