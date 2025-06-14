import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const { cart: savedCartItems, ukupna_cijena } = JSON.parse(savedCart);
      setCart(savedCartItems);
      setTotalPrice(ukupna_cijena);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify({ cart, ukupna_cijena: totalPrice })
    );
  }, [cart, totalPrice]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, kolicina: cartItem.kolicina + item.kolicina }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }

    // Update total price
    const itemPrice = item.akcijska_cijena || item.cijena;
    setTotalPrice((prevTotal) => prevTotal + itemPrice * item.kolicina);
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cart.find((item) => item.id === itemId);
    if (itemToRemove) {
      const itemPrice = itemToRemove.akcijska_cijena || itemToRemove.cijena;
      setTotalPrice(
        (prevTotal) => prevTotal - itemPrice * itemToRemove.kolicina
      );
      setCart(cart.filter((item) => item.id !== itemId));
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      const oldQuantity = item.kolicina;
      const itemPrice = item.akcijska_cijena || item.cijena;

      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, kolicina: newQuantity }
            : cartItem
        )
      );

      // Update total price based on quantity change
      setTotalPrice(
        (prevTotal) => prevTotal + itemPrice * (newQuantity - oldQuantity)
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
