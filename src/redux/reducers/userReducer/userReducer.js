import { act } from "react-dom/test-utils";
import { UserActionTypes } from "./user.types";

const loadUser = () => {
  try {
    const storage = localStorage.getItem("user");

    if (storage) {
      return JSON.parse(storage);
    } else {
      return {
        currentUser: null,
        admin: null,
        isLogged: false,
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const INITIAL_STATE = loadUser();

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isLogged: true,
      };
    case UserActionTypes.LOG_OUT:
      return {
        ...state,
        currentUser: null,
        admin: null,
        isLogged: false,
      };
    case UserActionTypes.ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload,
        isLogged: true,
      };

    default:
      return state;
  }
};

export default userReducer;
