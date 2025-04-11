import { useState, useEffect } from "react";
import {
  FiSearch,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
  FiEdit,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const LogActivity = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  const fetchLogs = async (page = 1) => {
    try {
      setIsLoadingData(true);
      const response = await fetch(
        `http://localhost:8000/api/logs?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

      setActivities(data.data || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error("Gagal memuat log aktivitas:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Apakah yakin ingin menghapus log ini?");
    if (confirmed) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:8000/api/logs/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        fetchLogs(pagination.current_page); // reload current page
      } catch (error) {
        console.error("Gagal menghapus log:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const filteredActivities = activities.filter((activity) =>
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchLogs();
  }, []);

  const goToPage = (page) => {
    fetchLogs(page);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar name={"John Doe"} />
        <div className="p-6">
          {isLoadingData || isLoading ? (
            <div className="animate-pulse">Loading...</div>
          ) : (
            <>
              <div className="mb-4 flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <FiSearch className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Cari aktivitas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  <AnimatePresence>
                    {filteredActivities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <FiEdit className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {activity.action}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(activity.created_at)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(activity.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-sm p-12 text-center"
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      Tidak ada aktivitas ditemukan
                    </h3>
                  </motion.div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex justify-center items-center gap-2">
                <button
                  disabled={!pagination.prev_page_url}
                  onClick={() => goToPage(pagination.current_page - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Sebelumnya
                </button>
                <span className="text-gray-700 font-medium">
                  Halaman {pagination.current_page} dari {pagination.last_page}
                </span>
                <button
                  disabled={!pagination.next_page_url}
                  onClick={() => goToPage(pagination.current_page + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Selanjutnya
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogActivity;
