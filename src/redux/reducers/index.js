import userReducer from "./userReducer/userReducer";
import cartReducer from "./cartReducer/cartReducer";
import searchReducer from "./searchReducer/searchReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: userReducer,
  cart: cartReducer,
  filter: searchReducer,
});

export default allReducers;
