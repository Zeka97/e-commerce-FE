import { CartActionTypes } from "./cart.types.";
import {
  addItem,
  decreaseQuantityItem,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  cart: [],
  ukupna_cijena: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      var { cart, ukupna } = addItem(
        state.cart,
        state.ukupna_cijena,
        action.payload
      );
      return {
        ...state,
        cart: cart,
        ukupna_cijena: ukupna,
      };
    case CartActionTypes.DECREASE_QUANTITY_ITEM:
      ({ cart, ukupna } = decreaseQuantityItem(
        state.cart,
        state.ukupna_cijena,
        action.payload
      ));
      return {
        ...state,
        cart: cart,
        ukupna_cijena: ukupna,
      };
    case CartActionTypes.REMOVE_ITEM:
      ({ cart, ukupna } = removeItemFromCart(
        state.cart,
        state.ukupna_cijena,
        action.payload
      ));
      return {
        ...state,
        cart: cart,
        ukupna_cijena: ukupna,
      };
    case CartActionTypes.REMOVE_ALL:
      return {
        ...state,
        cart: [],
        ukupna_cijena: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
