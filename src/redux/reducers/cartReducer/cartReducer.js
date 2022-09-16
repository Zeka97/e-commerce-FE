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
      console.log(cart, ukupna);
      return {
        ...state,
        cart: cart,
        ukupna_cijena: ukupna,
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
