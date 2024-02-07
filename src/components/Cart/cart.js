import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { removeAlItemsFromCart } from "../../redux/actions/cart.action";
import CustomLinkButton from "../customLinkButton/customLinkButton";

import "./cart.css";
import { Drawer } from "antd";

const Cart = (props) => {

  const [open,setOpen] = useState(false);
  const openDropdown = () => {
    console.log("1231231");
    setOpen(!open);
  };

  return (
    <>
    <div className="cart">
      <div className="cart-icon" onClick={() => openDropdown()}></div>
    </div>
    <Drawer title="Cart" placement="right" onClose={openDropdown} open={open} width={500}>
    <div className="h-full">
      <div className="cart-dropdown_items">
        {props.cart.length ? (
          <>
          {props.cart.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
          <div className="flex justify-end mt-8 gap-16 font-bold text-xl mr-4">
            <span>TOTAL:</span><span>{props.ukupna_cijena}$</span>
          </div>
        </>
        ) : (
          <div className="w-full h-full flex justify-center items-center"
          >
            <span className="empty-message">Your cart is empty</span>
          </div>
        )}
      </div>
      {props.cart.length && (
        <div className="flex flex-col gap-8">
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
      )}
    </div>
  </Drawer>
  </>
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
