import { searchActionTypes } from "./search.types";

const initialState = {
  discount: null,
  category: null,
  popular: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchActionTypes.CATEGORY_SELECT_ONLY:
      return {
        ...state,
        category: action.payload,
        popular: null,
        discount: null,
      };
    case searchActionTypes.DISCOUNT_SELECT_ONLY:
      return {
        ...state,
        discount: action.payload,
        popular: null,
        category: null,
      };
    case searchActionTypes.POPULAR_SELECT_ONLY:
      return {
        ...state,
        popular: action.payload,
        discount: null,
        category: null,
      };
    case searchActionTypes.CATEGORY_SELECT:
      return {
        ...state,
        category: action.payload,
      };
    case searchActionTypes.DISCOUNT_SELECT:
      return {
        ...state,
        discount: action.payload,
      };
    case searchActionTypes.POPULAR_SELECT:
      return {
        ...state,
        popular: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
