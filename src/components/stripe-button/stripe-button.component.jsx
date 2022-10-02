import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { removeAlItemsFromCart } from "../../redux/actions/cart.action";
import { useNavigate } from "react-router-dom";
import axios from "../../components/Axios/axios";
import { message } from "antd";

const StripeCheckoutButton = ({ price, length }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_afksYxpqmYrwJ0iAgmoQf1xK00yqZMA1yJ";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const ukupna = useSelector((state) => state.cart.ukupna_cijena);
  const user = useSelector((state) => state.auth.currentUser);

  const onToken = (token) => {
    let artikli = [];
    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.id = cart[i].artikal_id;
      obj.naziv = cart[i].naziv;
      obj.kolicina = cart[i].kolicina;
      obj.cijena = cart[i].cijena;
      artikli.push(obj);
    }
    axios
      .post("/users/kreirajnarudzbu", {
        artikli: artikli,
        user: user.id,
        ukupna: ukupna,
      })
      .then((result) => {
        dispatch(removeAlItemsFromCart());
        navigate("/");
        message.success("Uspjesno ste izvrsili narudzbu", 2);
      })
      .catch((err) => {
        console.log(err);
        message.error("Greska pri narudzbi, pokusajte ponovo.", 2);
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="E-Trgovina"
      billingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price} KM`}
      amount={priceForStripe}
      panelLabel="PAY Now"
      token={onToken}
      stripeKey={publishableKey}
      {...(!length
        ? {
            disabled: true,
          }
        : null)}
    />
  );
};

export default StripeCheckoutButton;
