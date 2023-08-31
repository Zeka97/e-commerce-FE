import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { removeAlItemsFromCart } from "../../redux/actions/cart.action";
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
        <div className="content-box">
          <div className="cart-dropdown_items">
            {props.cart.length ? (
              props.cart.map((item) => {
                return <CartItem key={item.id} item={item} />;
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span className="empty-message">Your cart is empty</span>
              </div>
            )}
          </div>
          {props.cart.length ? (
            <div className="cart-dropdown_checkout">
              <CustomLinkButton
                to="/naplata"
                className={"dark"}
                onClick={() => openDropdown()}
              >
                Plaćanje
              </CustomLinkButton>
              <CustomLinkButton
                className={"light"}
                to={"#"}
                onClick={props.removeAllFromCart}
              >
                Očisti korpu
              </CustomLinkButton>
            </div>
          ) : null}
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeAllFromCart: () => dispatch(removeAlItemsFromCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
