import axios from "axios";

const wisdomApi = axios.create({
  baseURL: import.meta.env.VITE_WISDOM_API_URL,
});

wisdomApi.interceptors.request.use((config) => {
  // Optional: Add token if needed
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default wisdomApi;
