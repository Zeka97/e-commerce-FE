import cart from "../../../components/Cart/cart";

export const addItem = (cart, addedToCart) => {
  console.log(addedToCart);
  let postojiItem = cart.find(
    (item) => item.artikal_id === addedToCart.artikal_id
  );

  console.log(postojiItem);

  if (postojiItem) {
    return cart.map((cartItem) =>
      cartItem.artikal_id === addedToCart.artikal_id &&
      cartItem.max_kolicina - 1 > cartItem.kolicina
        ? { ...cartItem, kolicina: cartItem.kolicina + addedToCart.kolicina }
        : cartItem
    );
  } else {
    return [...cart, { ...addedToCart }];
  }
};

export const decreaseQuantityItem = (cart, removeFromCart) => {
  let postojiItem = cart.find(
    (item) => item.artikal_id === removeFromCart.artikal_id
  );

  if (postojiItem.kolicina === 1)
    return cart.filter(
      (cartItem) => cartItem.artikal_id !== removeFromCart.artikal_id
    );

  return cart.map((cartItem) =>
    cartItem.artikal_id === removeFromCart.artikal_id
      ? { ...cartItem, kolicina: cartItem.kolicina - 1 }
      : cartItem
  );
};

export const removeItemFromCart = (cart, removeItemFromCart) => {
  return cart.filter(
    (cartItem) => cartItem.artikal_id !== removeItemFromCart.artikal_id
  );
};
