import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FilterBar from "../components/FilterBar";
import AddTransactionForm from "../components/AddTransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";

//import { getTransactions } from "../../api/transactions";

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
  const [filteredTransactions, setFilteredTransactions] = useState(dummyTransactions);
  const [modal, setModal] = useState(null);
  const [currentTxn, setCurrentTxn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions);
      } catch (err) {
        setError("Gagal memuat data transaksi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();   
  }, []);*/

  // Simulate data loading
  useEffect(() => {
    setLoading(false);
    setFilteredTransactions(transactions);
  }, [transactions]);

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

  //hapus transaksi
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      /*try {
        await deleteTransaction(id);
        setTransactions(transactions.filter((txn) => txn.id !== id));
      } catch (err) {
        alert("Gagal menghapus transaksi.");
        console.error(err);
      }*/
      setTransactions(transactions.filter((txn) => txn.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Data Transactions</h1>

          {/* Filter Bar Component */}
          <FilterBar onFilterChange={handleFilterChange} />

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
          {loading && <p className="text-center text-gray-500">Memuat data transaksi...</p>}

          {/* Menampilkan pesan error kalau gagal memuat data */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Menampilkan tabel transaksi kalau data sudah dimuat */}
          {filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">No</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Amount</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Category</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Type</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Date</th>
                    <th className="py-2 px-4 md:px-4 border whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn, index) => (
                    <tr key={txn.id} className="border-b text-center">
                      <td className="py-2 px-4 md:px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 md:px-4 border">{formatRupiah(txn.amount)}</td>
                      <td className="py-2 px-4 md:px-4 border">{txn.category.name}</td>
                      <td className={`py-2 px-4 md:px-4 border font-semibold ${txn.type === "income" ? "text-green-500" : "text-red-500"}`}>{txn.type}</td>
                      <td className="py-2 px-4 md:px-4 border">{formatDate(txn.transaction_date)}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && !error && <p className="text-center text-gray-500">No transactions found.</p>
          )}
        </div>
      </div>
      {modal && <TransactionModal mode={modal} txn={currentTxn} onClose={() => setModal(null)} onSave={handleSave} />}
    </div>
  );
};
export default Transactions;
