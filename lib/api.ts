import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  signup: (data: any) => api.post("/auth/signup", data),
  signin: (data: any) => api.post("/auth/signin", data),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh-token"),
  me: () => api.get("/user/profile"),
  verifyEmail: (token: string) => api.get(`/auth/verify-email?token=${token}`),
  resendVerification: (email: string) =>
    api.post("/auth/resend-verification-email", { email }),
};

export const urlApi = {
  shorten: (data: { originalUrl: string; shortCode?: string }) =>
    api.post("/url/shorten", data),
  list: () => api.get("/url"),
  delete: (id: string) => api.delete(`/url/${id}`),
  update: (id: string, data: { originalUrl?: string; shortCode?: string }) =>
    api.patch(`/url/${id}`, data),
  analytics: (shortCode: string) => api.get(`/url/analytics/${shortCode}`),
};

export default api;
