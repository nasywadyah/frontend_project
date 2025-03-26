import axios from "axios";

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
    localStorage.setItem("userid", response.data.data.id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
