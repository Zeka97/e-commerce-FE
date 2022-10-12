import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import CustomLinkButton from "../customLinkButton/customLinkButton";

import "./cart.css";

const Cart = (props) => {
  const openDropdown = () => {
    let element = document.getElementById("cart-dropdown");
    element.classList.toggle("active");
  };

  return (
    <div className="cart">
      <div className="cart-icon" onClick={() => openDropdown()}></div>
      <div className="cart-dropdown" id="cart-dropdown">
        <div className="cart-dropdown_items">
          {props.cart.length ? (
            props.cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        {props.cart.length ? (
          <div className="cart-dropdown_checkout">
            <CustomLinkButton to="/naplata" className={"linkbutton"}>
              Checkout
            </CustomLinkButton>
            <span>Ukupno: {props.ukupna_cijena}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.cart,
    ...state.ukupna_cijena,
  };
};

export default connect(mapStateToProps)(Cart);
