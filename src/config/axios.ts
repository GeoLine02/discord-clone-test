import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITchE_DEV_API_URL,
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
