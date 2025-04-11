import axios from "axios";
import api from "../utils/expiredApi";

const API_URL = "http://localhost:8000/api/transactions";


//dapet semua data
export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(API_URL, {
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

export const createTransaction = async ({
  amount,
  type,
  category_id,
  description,
  transaction_date,
}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      API_URL,
      { amount, type, category_id, description, transaction_date },
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

export const updateTransaction = async (
  transactionId,
  { amount, type, category_id, description, transaction_date }
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `${API_URL}/${transactionId}`,
      { amount, type, category_id, description, transaction_date },
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


export const deleteTransaction = async (transactionId) => {
  try {
    const token = localStorage.getItem("token");
    await api.delete(`${API_URL}/${transactionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
