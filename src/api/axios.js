import axios from "axios";

const backend = process.env.REACT_APP_BASE_URL;

console.log(backend);

const instance = axios.create({
  baseURL: backend,
});

export default instance;
