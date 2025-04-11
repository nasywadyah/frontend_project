import { useEffect, useState } from "react";
import { FaUserSlash } from "react-icons/fa";
import api from "../../utils/expiredApi";
import Navbar from "../components/navbar";
import SidebarAdmin from "../components/SidebarAdmin";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `http://localhost:8000/api/admin/users?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      setError("Gagal memuat data user.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchUsers(newPage);
    }
  };

  const handleDeactivate = async (email) => {
    if (!window.confirm("Apakah Anda yakin ingin menonaktifkan pengguna ini?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `http://localhost:8000/api/admin/users/${email}/deactivate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User berhasil dinonaktifkan.");
      fetchUsers();
    } catch (error) {
      console.error("Error deactivating user:", error);
      alert("Terjadi kesalahan saat menonaktifkan user.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar name="Admin" />
        <div className="p-6">
          <h1 className="text-lg sm:text-2xl font-semibold mb-4">
            Kelola Pengguna
          </h1>
          {loading && (
            <p className="text-center text-gray-500">Memuat data pengguna...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-2 px-4 border">No</th>
                    <th className="py-2 px-4 border">Nama</th>
                    <th className="py-2 px-4 border hidden sm:table-cell">
                      Email
                    </th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className="border-b text-center">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border hidden sm:table-cell break-all">
                        {user.email}
                      </td>
                      <td
                        className={`py-2 px-4 border font-semibold ${
                          user.status === "deactive"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="py-2 px-4 border">
                        {user.status === "active" && (
                          <button
                            onClick={() => handleDeactivate(user.email)}
                            className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1 hover:bg-red-600 transition"
                          >
                            <FaUserSlash /> Nonaktifkan
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={!pagination.prev_page_url}
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-gray-700">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>

                <button
                  disabled={!pagination.next_page_url}
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
                Tidak ada pengguna ditemukan.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
