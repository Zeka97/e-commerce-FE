import axios from "./axios";

export const userCreateOrder = async (params) => {
  console.log(params);
  const { status } = await axios.post("/users/kreirajnarudzbu", {
    params,
  });

  return status;
};

export const getAllCategories = async (params) => {
  const { data } = await axios.get("/kategorije", { params });

  return data;
};

export const getArticles = async (params) => {
  const { data } = await axios.get("/artikli/", { params });

  return data;
};

export const getArticle = async (params) => {
  console.log("asdwdasdsa");
  const { data } = await axios.get("/artikli/artikal", { params });
  console.log(data);
  return data;
};

export const userGetOrders = async (params) => {
  const { data } = await axios.get("users/listanarudzbi", { params });

  return data;
};

export const login = async (params) => {
  const { data } = await axios.post("/login", { params });

  return data;
};

export const register = async (params) => {
  const { status } = await axios.post("/register", { params });

  return status;
};

export const updateUserProfile = async (params) => {
  const { data } = await axios.post("/users/updateUserProfile", { params });

  return data;
};

export const changeUserPassword = async (params) => {
  const { data } = await axios.post("/users/changePassword", { params });

  return data;
};

export const getAllTransactions = async (params) => {
  const { data } = await axios.get("/admin/getAllTransactions", { params });
  return data;
};

export const changeArticleVisibility = async (params) => {
  const { data } = await axios.post("/admin/changeArticleVisibility", {
    params,
  });

  return data;
};

export const setArticleOutOfStock = async (params) => {
  const { data } = await axios.post("/admin/setArticleOutOfStock", { params });

  return data;
};

export const updateCategory = async (params) => {
  const { data } = await axios.post("/admin/updateCategory", { params });

  return data;
};

export const updateDiscountPrice = async (params) => {
  const { data } = await axios.post("/admin/updateArticleDiscountPrice", {
    params,
  });
  return data;
};

export const removeDiscountPrice = async (params) => {
  const { data } = await axios.post("/admin/removeArticleDiscountPrice", {
    params,
  });
  return data;
};

export const editArticle = async (params) => {
  const { data } = await axios.post("/admin/editArticle", {
    params,
  });
  return data;
};

export const addNewCategory = async (params) => {
  const { data } = await axios.post("/admin/addNewCategory", {
    params,
  });

  return data;
};

export const getAllUsers = async (params) => {
  const { data } = await axios.get("/admin/getAllUsers", {
    params,
  });
  return data;
};
