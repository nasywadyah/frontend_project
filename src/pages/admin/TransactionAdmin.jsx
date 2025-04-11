import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../../utils/expiredApi";
import Navbar from "../components/navbar";
import SidebarAdmin from "../components/SidebarAdmin";

const TransactionAdmin = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const fetchTransactions = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `http://localhost:8000/api/admin/transactions?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(response.data.data.data);
      setPagination(response.data.data);
    } catch (error) {
      setError("Gagal memuat data transaksi.");
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchTransactions(newPage);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`http://localhost:8000/api/admin/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Transaksi berhasil dihapus.");
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Terjadi kesalahan saat menghapus transaksi.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar name="Admin" />
        <div className="p-6">
          <h1 className="text-lg sm:text-2xl font-semibold mb-4">
            Kelola Transaksi
          </h1>
          {loading && (
            <p className="text-center text-gray-500">
              Memuat data transaksi...
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-2 px-4 border">No</th>
                    <th className="py-2 px-4 border">Nama Pengguna</th>
                    <th className="py-2 px-4 border">Tipe</th>
                    <th className="py-2 px-4 border">Kategori</th>
                    <th className="py-2 px-4 border">Jumlah</th>
                    <th className="py-2 px-4 border">Tanggal</th>
                    <th className="py-2 px-4 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id} className="border-b text-center">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">
                        {transaction.user.name}
                      </td>
                      <td className="py-2 px-4 border">{transaction.type}</td>
                      <td className="py-2 px-4 border">
                        {transaction.category.name}
                      </td>
                      <td className="py-2 px-4 border">
                        {formatRupiah(transaction.amount)}
                      </td>
                      <td className="py-2 px-4 border">
                        {transaction.transaction_date}
                      </td>
                      <td className="py-2 px-4 border flex justify-center gap-2">
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <FaTrash /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={pagination.current_page === 1}
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-gray-700">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>

                <button
                  disabled={pagination.current_page === pagination.last_page}
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-500">
                Tidak ada transaksi ditemukan.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionAdmin;
