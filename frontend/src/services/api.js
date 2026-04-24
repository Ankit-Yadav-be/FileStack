import axios from "axios";

const API = axios.create({
  baseURL: "https://file-stack-kappa.vercel.app/api",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;