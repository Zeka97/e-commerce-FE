import { CartActionTypes } from "./cart.types.";
import {
  addItem,
  decreaseQuantityItem,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cart: addItem(state.cart, action.payload),
      };
    case CartActionTypes.DECREASE_QUANTITY_ITEM:
      return {
        ...state,
        cart: decreaseQuantityItem(state.cart, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cart: removeItemFromCart(state.cart, action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
