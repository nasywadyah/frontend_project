import axios from "axios";

const API_URL = "http://localhost:8000/api/transactions";

//dapet semua data
export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
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

//nambahin transaksi yaww
export const createTransaction = async ({ amount, type, category, description, date }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_URL,
      {
        amount,
        type,
        category,
        description,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//ini update atau memperbarui yaa
export const updateTransaction = async (transactionId, { amount, type, category, description, date }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/${transactionId}`,
      {
        amount,
        type,
        category,
        description,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//ini buat hapus kayak masalalu
export const deleteTransaction = async (transactionId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${transactionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
