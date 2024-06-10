import React from "react";
import "./CartItem.css";

import {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../redux/actions/cart.action";
import { connect } from "react-redux";

const CartItem = ({ key, item, ...props }) => {
  return (
    <div className="cart_item" key={key}>
      <img
        className="cart_item_photo"
        src={item.photo}
        alt={`slika ${item.photo}`}
      />
      <div className="cart_item_naziv flex justify-center">{item.naziv}</div>
      <div className="cart_item_kolicina">
        <span
          className="cart_item_kolicina_edit"
          onClick={() => props.decrease(item)}
        >
          {"<"}
        </span>
        <span className="cart_item_kolicina_value">{item.kolicina}</span>
        <span
          className="cart_item_kolicina_edit"
          onClick={() => props.increase({ ...item, kolicina: 1 })}
        >
          {">"}
        </span>
      </div>
      <span className="cart_item_cijena">
        {" "}
        {item.akcijska_cijena ? item.akcijska_cijena : item.cijena}
      </span>
      <span className="cart_item_removeall" onClick={() => props.remove(item)}>
        X
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    decrease: (item) => dispatch(decreaseItemQuantity(item)),
    remove: (item) => dispatch(removeItemFromCart(item)),
    increase: (item) => dispatch(addItemToCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
