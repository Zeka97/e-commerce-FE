import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

import { Drawer } from "antd";

const Cart = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const openDropdown = () => {
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-cente">
      <div
        className="flex justify-center items-center h-[36px] w-[36px] bg-center bg-no-repeat bg-cover bg-cart-icon relative"
        onClick={openDropdown}
      >
        <span className="flex items-center justify-center rounded-full bg-red-500 text-white text-sm h-[24px] w-[24px] absolute -top-8 -right-4">
          {cart.length}
        </span>
      </div>
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={closeDropdown}
        open={open}
        width={600}
      >
        <div className="h-full">
          <div className="flex flex-col gap-4">
            {cart.length ? (
              <>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
                <div className="flex justify-end mt-8 gap-16 font-bold text-xl mr-4">
                  <span>TOTAL:</span>
                  <span>{totalPrice}$</span>
                </div>
              </>
            ) : (
              <span className="text-center text-gray-500">
                Your cart is empty
              </span>
            )}
          </div>
          {cart.length > 0 && (
            <div className="flex flex-col gap-8 mt-8 w-full">
              <CustomButton
                onClick={() => {
                  navigate("/naplata");
                  closeDropdown();
                }}
                type="black"
              >
                Checkout
              </CustomButton>
              <CustomButton
                onClick={() => {
                  clearCart();
                  closeDropdown();
                }}
                type="light"
              >
                Clear Cart
              </CustomButton>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
