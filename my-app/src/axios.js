import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 9000,
});

instance.defaults.withCredentials = true;

export default instance;
