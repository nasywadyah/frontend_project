import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FilterBar from "../components/FilterBar";
import AddTransactionForm from "../components/AddTransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";
import ViewTransaction from "../components/ViewTransaction";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/transactions";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [modal, setModal] = useState(null);
  const [currentTxn, setCurrentTxn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data.data);
      setFilteredTransactions(data.data);
    } catch (err) {
      setError("Gagal memuat data transaksi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...transactions];

    if (filters.category) {
      filtered = filtered.filter(
        (txn) => txn.category?.name === filters.category
      );
    }

    if (filters.type) {
      filtered = filtered.filter(
        (txn) => txn.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.min_amount) {
      filtered = filtered.filter(
        (txn) => txn.amount >= Number.parseFloat(filters.min_amount)
      );
    }

    if (filters.max_amount) {
      filtered = filtered.filter(
        (txn) => txn.amount <= Number.parseFloat(filters.max_amount)
      );
    }

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
    setCurrentPage(1);
  };

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const formatRupiah = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);

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

  const handleSave = async (newTxn) => {
    if (
      !newTxn ||
      !newTxn.amount ||
      !newTxn.category ||
      !newTxn.transaction_date ||
      !newTxn.type
    ) {
      console.error("Data tidak lengkap!", newTxn);
      return;
    }

    setLoading(true);
    try {
      if (modal === "add") {
        await createTransaction(newTxn);
      } else if (modal === "edit") {
        await updateTransaction(newTxn.id, newTxn);
      }

      // Refetch untuk memastikan ID dan data akurat
      await fetchTransactions();
      setModal(null);
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan transaksi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      try {
        await deleteTransaction(id);

        // Refetch dari backend agar UI selalu akurat
        await fetchTransactions();
      } catch (err) {
        console.error(
          "Error saat menghapus:",
          err.response?.data || err.message
        );
        alert("Gagal menghapus transaksi.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Data Transactions</h1>

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

          {loading && (
            <p className="text-center text-gray-500">
              Memuat data transaksi...
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {Array.isArray(filteredTransactions) &&
          filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-2 px-4 border">No</th>
                    <th className="py-2 px-4 border">Amount</th>
                    <th className="py-2 px-4 border">Category</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border hidden sm:table-cell">
                      Date
                    </th>
                    <th className="py-2 px-4 border hidden sm:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((txn, index) => (
                    <tr key={txn.id} className="border-b text-center">
                      <td className="py-2 px-4 border">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="py-2 px-4 border">
                        {formatRupiah(txn.amount)}
                      </td>
                      <td className="py-2 px-4 border">
                        {txn.category?.name || "-"}
                      </td>
                      <td
                        className={`py-2 px-4 border font-semibold ${
                          txn.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {txn.type}
                      </td>

                      {/* Date column - only visible on sm+ screens */}
                      <td className="py-2 px-4 border hidden sm:table-cell">
                        {formatDate(txn.transaction_date)}
                      </td>

                      {/* Actions column - only visible on sm+ screens */}
                      <td className="py-2 px-2 border hidden sm:table-cell">
                        <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
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
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1"
                            onClick={() => {
                              handleDelete(txn.id);
                            }}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center mt-4 gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
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
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "edit" && currentTxn && (
        <EditTransactionForm
          transaction={currentTxn}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "view" && currentTxn && (
        <ViewTransaction
          transaction={currentTxn}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default Transactions;
