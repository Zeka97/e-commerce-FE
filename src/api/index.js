import axios from "./axios";

export const userCreateOrder = async (params) => {
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
  const { data } = await axios.get("/artikli/artikal", { params });

  return data;
};

export const userGetOrders = async (params) => {
  const { data } = await axios.get("users/listanarudzbi", { params });

  return data;
};

export const loginUser = async (params) => {
  const { data } = await axios.post("/login", { params });

  return data;
};

export const registerUser = async (params) => {
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

export const deleteArticle = async (id) => {
  await axios.delete(`/admin/article/${id}`);
};

export const editArticle = async (params) => {
  const { data } = await axios.post("/admin/editArticle", {
    ...params,
  });
  return data;
};

export const addArticle = async (params) => {
  const { data } = await axios.post("/admin/addArticle", params);

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

export const blockUser = async (id) => {
  const { status } = await axios.post(`/admin/blockUser/${id}`);

  return status;
};

export const getUserDetails = async (id) => {
  const { data } = await axios.get(`/admin/getUserDetails/${id}`);

  return data;
};

export const getStatistic = async (id) => {
  const { data } = await axios.get(`/admin/statistics`);

  return data;
};
