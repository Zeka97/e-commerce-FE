import React from "react";
import { connect } from "react-redux";

import "./checkout.css";

import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import CustomLinkButton from "../../components/customLinkButton/customLinkButton";

const CheckoutPage = (props) => (
  <>
    <CustomLinkButton to="/" className="linkbutton">
      Nazad na pocetnu
    </CustomLinkButton>
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {props.cart.map((cartItem) => (
        <CheckoutItem key={cartItem.artikal_id} cartItem={cartItem} />
      ))}

      <div className="total">TOTAL: ${props.ukupna_cijena}</div>
      <div className="test-warning">
        *Please use the following test credit card for payments
        <br />
        4242 4242 4242 4242 - Exp: 01/23 - CV:123
      </div>

      <StripeCheckoutButton
        price={props.ukupna_cijena}
        length={props.cart.length}
      />
    </div>
  </>
);

const mapStateToProps = (state) => {
  return {
    ...state.cart,
    ...state.ukupna_cijena,
  };
};

export default connect(mapStateToProps)(CheckoutPage);
