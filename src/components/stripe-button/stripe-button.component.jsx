import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useCart } from "../../context/CartContext";
import { useMutation } from "react-query";
import { userCreateOrder } from "../../api";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const StripeCheckoutButton = ({ price }) => {
  const { clearCart, cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_afksYxpqmYrwJ0iAgmoQf1xK00yqZMA1yJ";
  const { mutate } = useMutation((params) => userCreateOrder(params), {
    retry: false,
  });
  const { user } = useUser();

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
      { artikli, user_id: user.id, ukupna: totalPrice },
      {
        onSuccess: () => {
          clearCart();
          navigate("/");
          notification.success({
            message: "Order",
            description: "You have successfully placed your order",
          });
        },
        onError: (error) => {
          notification.success({
            message: "Order",
            description: "There was an error with placing your order",
          });
        },
      }
    );
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="E-Commerce Shop"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
