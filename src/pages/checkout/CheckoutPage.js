import React from "react";
import { useCart } from "../../context/CartContext";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

const CheckoutPage = () => {
  const { cart, totalPrice } = useCart();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <div className="w-full max-w-4xlrounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Your Cart
        </h1>
        <div className="flex items-center justify-between w-full mb-4 text-lg font-bold text-gray-700 border-b pb-2">
          <div className="w-1/4 text-center">Product</div>
          <div className="w-1/4 text-center">Description</div>
          <div className="w-1/4 text-center">Quantity</div>
          <div className="w-1/4 text-center">Price</div>
          <div className="w-1/4 text-center">Remove</div>
        </div>
        {cart.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className="flex items-center justify-end w-full mt-6 text-2xl font-bold text-gray-800 border-t pt-4">
          <span>TOTAL: ${totalPrice}</span>
        </div>
        <div className="flex items-center justify-end w-full mt-4 text-sm text-gray-500">
          *Please use the following test credit card for payments*
          <br />
          4242 4242 4242 4242 - Exp: 01/25 - CVV: 123
        </div>
        <StripeCheckoutButton price={totalPrice} />
      </div>
    </div>
  );
};

export default CheckoutPage;
