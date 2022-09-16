import cart from "../../../components/Cart/cart";

export const addItem = (cart, ukupna_cijena, addedToCart) => {
  let postojiItem = cart.find(
    (item) => item.artikal_id === addedToCart.artikal_id
  );
  console.log("postojiItem", postojiItem);

  if (postojiItem) {
    return {
      cart: cart.map((cartItem) =>
        cartItem.artikal_id === addedToCart.artikal_id &&
        cartItem.max_kolicina - 1 > cartItem.kolicina
          ? {
              ...cartItem,
              kolicina: cartItem.kolicina + addedToCart.kolicina,
            }
          : { ...cartItem }
      ),
      ukupna: parseFloat(
        Number(
          ukupna_cijena + addedToCart.kolicina * addedToCart.cijena
        ).toFixed(2)
      ),
    };
  } else {
    return {
      cart: [...cart, { ...addedToCart }],
      ukupna: parseFloat(
        Number(
          ukupna_cijena + addedToCart.kolicina * addedToCart.cijena
        ).toFixed(2)
      ),
    };
  }
};

export const decreaseQuantityItem = (cart, ukupna_cijena, removeFromCart) => {
  let postojiItem = cart.find(
    (item) => item.artikal_id === removeFromCart.artikal_id
  );

  if (postojiItem.kolicina === 1)
    return {
      cart: cart.filter(
        (cartItem) => cartItem.artikal_id !== removeFromCart.artikal_id
      ),
      ukupna: parseFloat(
        Number(ukupna_cijena - removeFromCart.cijena).toFixed(2)
      ),
    };

  return {
    cart: cart.map((cartItem) =>
      cartItem.artikal_id === removeFromCart.artikal_id
        ? { ...cartItem, kolicina: cartItem.kolicina - 1 }
        : cartItem
    ),
    ukupna: parseFloat(Number(ukupna_cijena - removeFromCart.cijena)),
  };
};

export const removeItemFromCart = (cart, removeItemFromCart) => {
  return cart.filter(
    (cartItem) => cartItem.artikal_id !== removeItemFromCart.artikal_id
  );
};
