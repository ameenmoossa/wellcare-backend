
import axios from "axios";

const API = axios.create({
  baseURL: "https://wellcare-backend-8127.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================
   LOGIN
===================== */
export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

/* =====================
   REGISTER
===================== */
export const registerUser = async (name, email, password) => {
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Register failed" };
  }
};
