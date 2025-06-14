import React from "react";
import { useCart } from "../../context/CartContext";

const CheckoutItem = ({ cartItem }) => {
  const { id, naziv, kolicina, cijena, akcijska_cijena, photo } = cartItem;
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between w-full h-full p-4 mb-4  rounded-lg  ">
      <div className="w-1/4 flex items-center justify-center">
        <img
          src={photo}
          alt={naziv}
          className="w-[100px] h-[100px] object-cover rounded-lg"
        />
      </div>
      <span className="w-1/4 font-medium text-lg">{naziv}</span>
      <div className="w-1/4 flex items-center justify-center space-x-3">
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          onClick={() => updateQuantity(id, Math.max(1, kolicina - 1))}
        >
          &#10094;
        </button>
        <span className="w-10 text-center text-lg font-bold">{kolicina}</span>
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          onClick={() => updateQuantity(id, kolicina + 1)}
        >
          &#10095;
        </button>
      </div>
      <span className="w-1/4 text-right font-bold text-lg">
        ${akcijska_cijena || cijena}
      </span>
      <button
        className="w-1/4 text-red-500 hover:text-red-700 transition-colors"
        onClick={() => removeFromCart(id)}
      >
        &#10005;
      </button>
    </div>
  );
};

export default CheckoutItem;
