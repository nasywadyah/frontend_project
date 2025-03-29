import api from "../utils/expiredApi";

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("http://localhost:8000/api/auth/user", {
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
