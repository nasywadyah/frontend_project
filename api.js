import axios from "axios";

export const handleResetPassword = async (email) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/request-password-reset", { email });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    alert(error.response?.data?.message || "Failed to send reset link.");
  }
};

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
      email,
      password,
    });
    return response.data; // Mengembalikan data respons
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response?.data?.message || "Login failed, please try again.";
  }
};
