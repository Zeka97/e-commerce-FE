import userReducer from "./userReducer/userReducer";
import cartReducer from "./cartReducer/cartReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: userReducer,
  cart: cartReducer,
});

export default allReducers;
