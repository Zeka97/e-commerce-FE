import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { id, naziv, kolicina, cijena, akcijska_cijena, photo } = item;

  return (
    <div className="flex items-center justify-between gap-4">
      <img src={photo} alt={naziv} className="w-[50px] h-[50px]" />
      <div className="flex gap-16">
        <span className="text-wrap">{naziv}</span>
        <span>
          {kolicina} x ${akcijska_cijena || cijena}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div onClick={() => updateQuantity(id, Math.max(1, kolicina - 1))}>
          &#10094;
        </div>
        <span> {kolicina}</span>
        <div onClick={() => updateQuantity(id, kolicina + 1)}> &#10095;</div>
      </div>
      <div onClick={() => removeFromCart(id)}>&#10005;</div>
    </div>
  );
};

export default CartItem;
