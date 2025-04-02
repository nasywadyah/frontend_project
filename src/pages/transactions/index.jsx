import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddTransactionForm from "../components/AddTransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/transactions";

const Transactions = () => {
  const dummyTransactions = [
    {
      id: 1,
      amount: 50000,
      category: { name: "Makanan" },
      type: "expense",
      transaction_date: "2025-03-28",
      description: "Beli makan siang",
    },
    {
      id: 2,
      amount: 200000,
      category: { name: "Gaji" },
      type: "income",
      transaction_date: "2025-03-27",
      description: "Gaji bulanan",
    },
    {
      id: 3,
      amount: 100000,
      category: { name: "Transportasi" },
      type: "expense",
      transaction_date: "2025-03-26",
      description: "Bensin motor",
    },
  ];

  const [transactions, setTransactions] = useState(dummyTransactions);
  const [modal, setModal] = useState(null);
  const [currentTxn, setCurrentTxn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  // const fetchTransactions = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getTransactions();
  //     console.log(data.data);
  //     setTransactions(data.data);
  //   } catch (err) {
  //     setError("Gagal memuat data transaksi.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fungsi format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Fungsi format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Simpan transaksi baru atau edit transaksi
  const handleSave = async (newTxn) => {
    if (
      !newTxn ||
      !newTxn.amount ||
      !newTxn.category_id ||
      !newTxn.transaction_date ||
      !newTxn.type
    ) {
      alert("Data transaksi tidak lengkap!");
      return;
    }

    try {
      if (modal === "add") {
        const response = await createTransaction(newTxn);
        setTransactions([...transactions, response.transaction]);
      } else if (modal === "edit") {
        const response = await updateTransaction(newTxn.id, newTxn);
        setTransactions(
          transactions.map((txn) =>
            txn.id === newTxn.id ? response.transaction : txn
          )
        );
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan transaksi.");
      console.error(err);
    }

    setModal(null);
  };

  //hapus transaksi yhh
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      try {
        await deleteTransaction(id);
        setTransactions(transactions.filter((txn) => txn.id !== id));
      } catch (err) {
        alert("Gagal menghapus transaksi.");
        console.error(err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar name="User" />
        <div className="p-4 ">
          <h1 className="text-lg sm:text-2xl font-semibold mb-4">
            Data Transactions
          </h1>

          <button
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-blue-600 active:scale-95 transition sm:w-auto"
            onClick={() => {
              setCurrentTxn(null);
              setModal("add");
            }}
          >
            <FaPlus /> Tambah Transaction
          </button>

          {/* Menampilkan loading */}
          {loading && (
            <p className="text-center text-gray-500">
              Memuat data transaksi...
            </p>
          )}

          {/* Menampilkan pesan error kalau gagal memuat data */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Menampilkan tabel transaksi kalau data sudah dimuat */}
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-2 px-4 border">No</th>
                    <th className="py-2 px-4 border">Amount</th>
                    <th className="py-2 px-4 border">Category</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Description</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr key={txn.id} className="border-b text-center">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">
                        {formatRupiah(txn.amount)}
                      </td>
                      <td className="py-2 px-4 border">{txn.category.name}</td>
                      <td
                        className={`py-2 px-4 border font-semibold ${
                          txn.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {txn.type}
                      </td>
                      <td className="py-2 px-4 border">
                        {formatDate(txn.transaction_date)}
                      </td>
                      <td className="py-2 px-4 border">
                        {txn.description || "No description"}
                      </td>
                      <td className="py-2 px-4 border flex gap-1 sm:gap-2 justify-center flex-wrap">
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded flex items-center gap-1">
                          <FaEdit /> Edit
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1">
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-500">
                No transactions found.
              </p>
            )
          )}
        </div>
      </div>
      {modal === "add" && (
        <AddTransactionForm
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {modal === "edit" && (
        <EditTransactionForm
          txn={currentTxn}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Transactions;
