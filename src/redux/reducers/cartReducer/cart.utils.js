import cart from "../../../components/Cart/cart";

export const addItem = (cart, ukupna_cijena, addedToCart) => {
  let postojiItem = cart.find((item) => item.id === addedToCart.id);
  console.log("postojiItem", postojiItem);
  console.log("addedToCart", addedToCart);

  if (postojiItem) {
    return {
      cart: cart.map((cartItem) =>
        cartItem.id === addedToCart.id &&
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
  let postojiItem = cart.find((item) => item.id === removeFromCart.id);

  if (postojiItem.kolicina === 1)
    return {
      cart: cart.filter((cartItem) => cartItem.id !== removeFromCart.id),
      ukupna: parseFloat(
        Number(ukupna_cijena - removeFromCart.cijena).toFixed(2)
      ),
    };

  return {
    cart: cart.map((cartItem) =>
      cartItem.id === removeFromCart.id
        ? { ...cartItem, kolicina: cartItem.kolicina - 1 }
        : cartItem
    ),
    ukupna: parseFloat(
      Number(ukupna_cijena - removeFromCart.cijena).toFixed(2)
    ),
  };
};

export const removeItemFromCart = (cart, ukupna_cijena, removeItemFromCart) => {
  let ukupna;
  cart.map((cartItem) => {
    if (cartItem.id === removeItemFromCart.id) {
      ukupna = parseFloat(
        Number(ukupna_cijena - cartItem.cijena * cartItem.kolicina).toFixed(2)
      );
    }
  });
  return {
    cart: cart.filter((cartItem) => cartItem.id !== removeItemFromCart.id),
    ukupna: ukupna,
  };
};
