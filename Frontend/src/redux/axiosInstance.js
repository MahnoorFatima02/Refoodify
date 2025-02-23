import axios from "axios";
import { store } from "./store";
import { refreshAccessToken } from "./user/actions";

const axiosInstance = axios.create({
  baseURL: "https://refoodifybackend.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    let accessToken = state.user.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let subscribers = [];

const onRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback) => {
  subscribers.push(callback);
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const response = await store.dispatch(refreshAccessToken()).unwrap();
        const { accessToken } = response.data; // Adjust according to your API response
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        onRefreshed(accessToken);
        return await axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
