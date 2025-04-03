"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FilterBar from "../components/FilterBar";

// Uncomment when ready to use real API
// import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../../api/transactions"

const Transactions = () => {
  const dummyTransactions = [
    {
      id: 1,
      amount: 50000,
      category: { name: "Makanan" },
      type: "Expense",
      transaction_date: "2025-03-28",
      description: "Beli makan siang",
    },
    {
      id: 2,
      amount: 200000,
      category: { name: "Gaji" },
      type: "Income",
      transaction_date: "2025-03-27",
      description: "Gaji bulanan",
    },
    {
      id: 3,
      amount: 100000,
      category: { name: "Transportasi" },
      type: "Expense",
      transaction_date: "2025-03-26",
      description: "Bensin motor",
    },
  ];

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [modal, setModal] = useState(null);
  const [currentTxn, setCurrentTxn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For real API:
        // const data = await getTransactions()
        // setTransactions(data.data)
        // setFilteredTransactions(data.data)

        // Using dummy data for now
        setTransactions(dummyTransactions);
        setFilteredTransactions(dummyTransactions);
      } catch (err) {
        setError("Gagal memuat data transaksi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filters) => {
    let filtered = [...transactions];

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((txn) => txn.category.name === filters.category);
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter((txn) => txn.type.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by min amount
    if (filters.min_amount) {
      filtered = filtered.filter((txn) => txn.amount >= Number.parseFloat(filters.min_amount));
    }

    // Filter by max amount
    if (filters.max_amount) {
      filtered = filtered.filter((txn) => txn.amount <= Number.parseFloat(filters.max_amount));
    }

    // Filter by date range
    if (filters.date_range) {
      const today = new Date();
      let startDate;

      switch (filters.date_range) {
        case "1day":
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 1);
          break;
        case "3days":
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 3);
          break;
        case "1week":
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 7);
          break;
        case "1month":
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered.filter((txn) => {
          const txnDate = new Date(txn.transaction_date);
          return txnDate >= startDate && txnDate <= today;
        });
      }
    }

    setFilteredTransactions(filtered);
  };

  // Format currency to Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Format date to Indonesian format
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

  // Save new or edit existing transaction
  const handleSave = async (newTxn) => {
    console.log("Menyimpan transaksi:", newTxn);

    if (!newTxn || !newTxn.amount || !newTxn.category || !newTxn.transaction_date || !newTxn.type) {
      console.error("Data tidak lengkap!", newTxn);
      return;
    }

    setLoading(true);

    try {
      // For real API:
      // if (modal === "add") {
      //   const response = await createTransaction(newTxn)
      //   setTransactions([...transactions, response.transaction])
      // } else if (modal === "edit") {
      //   const response = await updateTransaction(newTxn.id, newTxn)
      //   setTransactions(transactions.map((txn) => txn.id === newTxn.id ? response.transaction : txn))
      // }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (modal === "add") {
        const newTransaction = {
          ...newTxn,
          id: transactions.length + 1,
          category: { name: newTxn.category },
        };
        setTransactions([...transactions, newTransaction]);
        setFilteredTransactions([...filteredTransactions, newTransaction]);
      } else if (modal === "edit") {
        const updatedTransactions = transactions.map((txn) =>
          txn.id === newTxn.id
            ? {
                ...newTxn,
                category: { name: newTxn.category },
              }
            : txn
        );
        setTransactions(updatedTransactions);
        setFilteredTransactions(updatedTransactions);
      }

      setModal(null);
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan transaksi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      setLoading(true);

      try {
        // For real API:
        // await deleteTransaction(id)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const updatedTransactions = transactions.filter((txn) => txn.id !== id);
        setTransactions(updatedTransactions);
        setFilteredTransactions(updatedTransactions);
      } catch (err) {
        setError("Gagal menghapus transaksi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // YouTube-style skeleton loader
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      </div>

      {/* Filter bar skeleton */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded w-40 mb-6"></div>

      {/* Table header skeleton */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>

      {/* Table rows skeleton */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="grid grid-cols-7 gap-2 mb-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      ))}

      {/* Section title skeleton (for pagination or summary) */}
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">Data Transactions</h1>

              {/* Filter Bar Component */}
              <FilterBar onFilterChange={handleFilterChange} />

              <button
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-blue-600 active:scale-95 transition sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => {
                  setCurrentTxn(null);
                  setModal("add");
                }}
                disabled={loading}
              >
                <FaPlus /> Tambah Transaction
              </button>

              {/* Menampilkan pesan error kalau gagal memuat data */}
              {error && <p className="text-center text-red-500 p-4 bg-red-50 rounded-md border border-red-200">{error}</p>}

              {/* Menampilkan tabel transaksi kalau data sudah dimuat */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">No</th>
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Amount</th>
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Category</th>
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Type</th>
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Date</th>
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Description</th>
                      <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((txn, index) => (
                        <tr key={txn.id} className="border-b text-center">
                          <td className="py-2 px-4 md:px-4 border">{index + 1}</td>
                          <td className="py-2 px-4 md:px-4 border">{formatRupiah(txn.amount)}</td>
                          <td className="py-2 px-4 md:px-4 border">{txn.category.name}</td>
                          <td className={`py-2 px-4 md:px-4 border font-semibold ${txn.type.toLowerCase() === "income" ? "text-green-500" : "text-red-500"}`}>{txn.type}</td>
                          <td className="py-2 px-4 md:px-4 border">{formatDate(txn.transaction_date)}</td>
                          <td className="py-2 px-4 md:px-4 border">{txn.description || "-"}</td>
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
                            <button className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1" onClick={() => handleDelete(txn.id)}>
                              <FaTrash /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      {modal && <TransactionModal mode={modal} txn={currentTxn} onClose={() => setModal(null)} onSave={handleSave} loading={loading} />}
    </div>
  );
};

// Modal Form with Skeleton Loading
const TransactionModal = ({ mode, txn, onClose, onSave, loading }) => {
  // Initialize form with correct structure matching the transaction data
  const [form, setForm] = useState(() => {
    if (txn) {
      return {
        id: txn.id,
        amount: txn.amount,
        category: txn.category.name,
        type: txn.type,
        transaction_date: txn.transaction_date,
        description: txn.description || "",
      };
    } else {
      return {
        amount: "",
        category: "",
        type: "",
        transaction_date: new Date().toISOString().split("T")[0],
        description: "",
      };
    }
  });

  // Local loading state for form
  const [formLoading, setFormLoading] = useState(true);

  // Simulate form data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  // Form skeleton loader
  const FormSkeletonLoader = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>

      {/* Amount field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Category field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Type field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Date field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Description field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-20 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <div className="h-10 bg-gray-200 rounded w-20"></div>
        <div className="h-10 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {formLoading || loading ? (
          <FormSkeletonLoader />
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">{mode === "add" ? "Tambah" : mode === "edit" ? "Edit" : "Detail"} Transaksi</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Amount</span>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full p-2 border rounded mt-1" disabled={mode === "view" || loading} required />
              </label>

              <label className="block">
                <span className="text-gray-700">Category</span>
                <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded mt-1" disabled={mode === "view" || loading} required>
                  <option value="">Select Category</option>
                  <option value="Gaji">Gaji</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Transportasi">Transportasi</option>
                  <option value="Hiburan">Hiburan</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Type</span>
                <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded mt-1" disabled={mode === "view" || loading} required>
                  <option value="">Select Type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Date</span>
                <input type="date" name="transaction_date" value={form.transaction_date} onChange={handleChange} className="w-full p-2 border rounded mt-1" disabled={mode === "view" || loading} required />
              </label>

              <label className="block">
                <span className="text-gray-700">Description</span>
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded mt-1" disabled={mode === "view" || loading} />
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose} disabled={loading}>
                  Close
                </button>
                {(mode === "add" || mode === "edit") && (
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
                    Save
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
