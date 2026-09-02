import axios from "axios";

const api = axios.create({
  baseURL: "https://dg-backend-nm4d.onrender.com/api",
  withCredentials: true,
});

// Event bus / callback for global session expiration
let onSessionExpiredCallback = null;

export const setSessionExpiredHandler = (callback) => {
  onSessionExpiredCallback = callback;
};

// Queue handling for concurrent 401 requests during token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Attach token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global response interceptor for token refresh & session expiration handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized
    if (
      !error.response ||
      error.response.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || "";

    // Do NOT attempt token refresh for login, refresh-token, or register endpoints
    if (
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/refresh-token") ||
      requestUrl.includes("/auth/register")
    ) {
      if (requestUrl.includes("/auth/refresh-token")) {
        localStorage.removeItem("token");
        if (typeof onSessionExpiredCallback === "function") {
          onSessionExpiredCallback();
        }
      }
      return Promise.reject(error);
    }

    // If there is no token in localStorage, user was not logged in
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      return Promise.reject(error);
    }

    // Mark original request as retried to prevent infinite loops
    originalRequest._retry = true;

    // If another request is currently refreshing the token, wait in queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      // Call existing POST /api/auth/refresh-token with http-only cookie credentials
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      const newToken = response.data?.token;

      if (!newToken) {
        throw new Error("No access token returned from refresh endpoint");
      }

      localStorage.setItem("token", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      processQueue(null, newToken);

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem("token");

      if (typeof onSessionExpiredCallback === "function") {
        onSessionExpiredCallback();
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
