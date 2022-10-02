export const addItemToCart = (item) => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

export const decreaseItemQuantity = (item) => {
  return {
    type: "DECREASE_QUANTITY_ITEM",
    payload: item,
  };
};

export const removeItemFromCart = (item) => {
  return {
    type: "REMOVE_ITEM",
    payload: item,
  };
};

export const removeAlItemsFromCart = () => {
  return {
    type: "REMOVE_ALL",
  };
};
