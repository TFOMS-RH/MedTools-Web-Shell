import axios from "axios";
import { useAuthStore } from "../../modules/auth/stores/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5256/api"
    : "http://localhost:5256/api", //Заглушка до релиза

  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
