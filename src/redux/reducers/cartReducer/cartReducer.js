import { CartActionTypes } from "./cart.types.";
import {
  addItem,
  decreaseQuantityItem,
  removeItemFromCart,
} from "./cart.utils";

const loadCart = () => {
  try {
    const storage = localStorage.getItem("cart");

    if (storage) {
      return JSON.parse(storage);
    } else {
      return {
        cart: [],
        ukupna_cijena: 0,
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const INITIAL_STATE = loadCart();

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      var { cart, ukupna } = addItem(
        state.cart,
        state.ukupna_cijena,
        action.payload
      );
      console.log(ukupna);
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart, ukupna_cijena: ukupna })
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
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart, ukupna_cijena: ukupna })
      );
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
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart, ukupna_cijena: ukupna })
      );
      return {
        ...state,
        cart: cart,
        ukupna_cijena: ukupna,
      };
    case CartActionTypes.REMOVE_ALL:
      localStorage.removeItem("cart");
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
