import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddTransactionForm from "../components/AddTransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";

import { getTransactions } from "../../api/transactions";

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data.transactions);
      } catch (err) {
        setError("Gagal memuat data transaksi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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
  const handleSave = (newTxn) => {
    console.log("Menyimpan transaksi:", newTxn);

    if (!newTxn || !newTxn.amount || !newTxn.category || !newTxn.date || !newTxn.type) {
      console.error("Data tidak lengkap!", newTxn);
      return;
    }

    if (modal === "add") {
      const newTransaction = { ...newTxn, id: transactions.length + 1 };
      setTransactions([...transactions, newTransaction]);
    } else if (modal === "edit") {
      setTransactions(transactions.map((txn) => (txn.id === newTxn.id ? newTxn : txn)));
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
                    <th className="py-2 px-4 md:px-4  border whitespace-nowrap">No</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Amount</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Category</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Type</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Date</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr key={txn.id} className="border-b text-center">
                      <td className="py-2 px-4 md:px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 md:px-4 border">{formatRupiah(txn.amount)}</td>
                      <td className="py-2 px-4 md:px-4 border">{txn.category}</td>
                      <td className={`py-2 px-4 md:px-4 border font-semibold ${txn.type === "Income" ? "text-green-500" : "text-red-500"}`}>{txn.type}</td>
                      <td className="py-2 px-4 md:px-4 border">{formatDate(txn.date)}</td>
                      <td className="py-2 px-2 md:px-4 border flex gap-1 sm:gap-2 justify-center flex-wrap">
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded flex items-center gap-1"
                          onClick={() => {
                            setCurrentTxn(txn);
                            setModal("view");
                          }}
                        >
                          <FaEye /> View
                        </button>
                        <button
                          className="px-3 py-1 bg-yellow-500 text-white rounded flex items-center gap-1"
                          onClick={() => {
                            setCurrentTxn(txn);
                            setModal("edit");
                          }}
                        >
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
      {modal && <TransactionModal mode={modal} txn={currentTxn} onClose={() => setModal(null)} onSave={handleSave} />}
    </div>
  );
};

// Modal Form
const TransactionModal = ({ mode, txn, onClose, onSave }) => {
  const [form, setForm] = useState(txn || { amount: "", category: "", type: "", date: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{mode === "add" ? "Tambah" : mode === "edit" ? "Edit" : "Detail"} Transaksi</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Amount</span>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full p-2 border rounded mt-1" disabled={mode === "view"} required />
          </label>

          <label className="block">
            Category
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" disabled={mode === "view"} required>
              <option value="">Select Category</option>
              <option value="Gaji">Gaji</option>
              <option value="Makanan">Makanan</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Hiburan">Hiburan</option>
            </select>
          </label>
          <label className="block">
            Type
            <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded" disabled={mode === "view"} required>
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </label>
          <label className="block">
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" disabled={mode === "view"} required />
          </label>
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
              Close
            </button>
            {(mode === "add" || mode === "edit") && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => onSave(form)}>
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transactions;
