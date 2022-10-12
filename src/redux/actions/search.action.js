export const categorySelectOnly = (category) => {
  return {
    type: "CATEGORY_SELECT_ONLY",
    payload: category,
  };
};

export const categorySelect = (category) => {
  return {
    type: "CATEGORY_SELECT",
    payload: category,
  };
};

export const discountSelectOnly = (isDiscount) => {
  return {
    type: "DISCOUNT_SELECT_ONLY",
    payload: isDiscount,
  };
};

export const discountSelect = (isDiscount) => {
  return {
    type: "DISCOUNT_SELECT",
    payload: isDiscount,
  };
};

export const popularSelectOnly = (isPopular) => {
  return {
    type: "POPULAR_SELECT_ONLY",
    payload: isPopular,
  };
};

export const popularSelect = (isPopular) => {
  return {
    type: "POPULAR_SELECT",
    payload: isPopular,
  };
};
