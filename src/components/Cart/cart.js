import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import CartItem from "../CartItem/CartItem";

import "./cart.css";

const Cart = (props) => {
  const openDropdown = () => {
    let element = document.getElementById("cart-dropdown");
    element.classList.toggle("active");
  };
  console.log("props:", props);

  return (
    <div className="cart">
      <div className="cart-icon" onClick={() => openDropdown()}></div>
      <div className="cart-dropdown" id="cart-dropdown">
        <div className="cart-dropdown_items">
          {props.cart.length ? (
            props.cart.map((item) => {
              return <CartItem key={item.artikal_id} item={item} />;
            })
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        {props.cart.length && (
          <div className="cart-dropdown_checkout">
            <button>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
