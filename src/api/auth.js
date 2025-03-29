import axios from "axios";
import api from "../utils/expiredApi";

export const register = async (name, email, phone, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        name,
        email,
        phone,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await api.post(
      "http://localhost:8000/api/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(error.response?.data?.message || "Logout failed!");
  }
};
