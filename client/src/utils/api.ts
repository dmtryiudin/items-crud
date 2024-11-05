import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

protectedApi.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

protectedApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);
