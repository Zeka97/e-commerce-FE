import React, { useReducer } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { removeAlItemsFromCart } from "../../redux/actions/cart.action";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { userCreateOrder } from "../../api";

const StripeCheckoutButton = ({ price, length }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_afksYxpqmYrwJ0iAgmoQf1xK00yqZMA1yJ";
  const { mutate } = useMutation((params) => userCreateOrder(params), {
    retry: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const ukupna = useSelector((state) => state.cart.ukupna_cijena);
  const user = useSelector((state) => state.auth.currentUser);

  const onToken = (token) => {
    let artikli = [];
    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.naziv = cart[i].naziv;
      obj.kolicina = cart[i].kolicina;
      if (cart[i].akcijska_cijena) {
        obj.cijena = cart[i].akcijska_cijena;
      } else {
        obj.cijena = cart[i].cijena;
      }
      artikli.push(obj);
    }

    mutate(
      { artikli, user_id: user.id, ukupna },
      {
        onSuccess: () => {
          dispatch(removeAlItemsFromCart());
          navigate("/");
          notification.success({message:'Order',
          description: "You have successfully placed your order"});
        },
        onError: (error) => {
          console.log(error);
          notification.success({message:'Order',
          description: "There was an error with placing your order"});
        },
      }
    );
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
