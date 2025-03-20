import axios from "axios";

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
