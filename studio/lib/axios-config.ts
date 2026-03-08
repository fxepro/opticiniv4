/**
 * Global axios interceptors for auth token injection and 401 handling.
 * Attaches to the default axios instance so all axios requests get:
 * - Auth header from localStorage
 * - 401 → token refresh → retry → redirect to login if refresh fails
 *
 * Import this file early (e.g. in workspace layout) to activate.
 */

import axios from "axios";

const getApiBase = () =>
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (typeof window !== "undefined" ? "" : "http://localhost:8000");

async function refreshAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;
  try {
    const base = getApiBase().replace(/\/$/, "") || "";
    const res = await axios.post(`${base}/api/token/refresh/`, {
      refresh: refreshToken,
    });
    const access = res.data.access;
    localStorage.setItem("access_token", access);
    if (res.data.refresh) {
      localStorage.setItem("refresh_token", res.data.refresh);
    }
    return access;
  } catch {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return null;
  }
}

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const isWorkspace = path.startsWith("/workspace");
  const loginPath = isWorkspace ? "/workspace/login" : "/login";
  const msg = encodeURIComponent(
    "Your session has expired. Please log in again."
  );
  window.location.href = `${loginPath}?error=${msg}`;
}

// Request: inject auth token
axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Response: on 401, try refresh + retry, else redirect
axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }
    const config = err.config;
    if (config?._retry) {
      redirectToLogin();
      return Promise.reject(err);
    }
    const newToken = await refreshAccessToken();
    if (newToken) {
      config._retry = true;
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${newToken}`;
      return axios(config);
    }
    redirectToLogin();
    return Promise.reject(err);
  }
);
