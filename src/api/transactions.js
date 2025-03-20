import axios from "axios";

export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/transactions", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};