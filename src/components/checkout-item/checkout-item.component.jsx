import React from "react";
import { connect } from "react-redux";
import {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../redux/actions/cart.action";

import "./checkout-item.css";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { naziv, photo, kolicina, cijena, akcijska_cijena } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={photo} alt="item" />
      </div>

      <span className="name">{naziv}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{kolicina}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">
        {akcijska_cijena ? akcijska_cijena : cijena}$
      </span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItemToCart(item)),
    removeItem: (item) => dispatch(decreaseItemQuantity(item)),
    clearItem: (item) => dispatch(removeItemFromCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);
