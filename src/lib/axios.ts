import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_ROOT_API,
});

export default instance;
