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
  const { status } = await axios.post("/regiter", { params });

  return status;
};
