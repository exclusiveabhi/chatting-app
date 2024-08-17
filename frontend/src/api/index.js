// api.js
import axios from "axios";
import { localStorageKeyAPIToken } from "../constants/api";

// Set base URL based on environment
export const backendBaseURL =
  process.env.REACT_APP_ENV === "PRODUCTION"
    ? process.env.REACT_APP_BACKEND_BASE_URL_PROD
    : process.env.REACT_APP_BACKEND_BASE_URL_LOCAL;
const instance = axios.create({ baseURL: backendBaseURL });

// Add an interceptor for authorization headers
instance.interceptors.request.use((config) => {
  // Retrieve token from local storage
  const token = localStorage.getItem(localStorageKeyAPIToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
