export const userLogin = (user) => {
  return {
    type: "USER_LOGIN",
    payload: user,
  };
};

export const adminLogin = (admin) => {
  return {
    type: "ADMIN_LOGIN",
    payload: admin,
  };
};

export const LOGOUT = () => {
  return {
    type: "LOG_OUT",
  };
};
