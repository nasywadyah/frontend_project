import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiArrowUp, FiArrowDown, FiEdit } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const LogActivityPage = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: "Isi Saldo", amount: 50000, date: "2025-01-07", status: "Sukses" },
    { id: 2, type: "Pembelian", amount: -60000, date: "2025-02-07", status: "Gagal" },
    { id: 3, type: "Isi Saldo dari SeaBank", amount: 50000, date: "2025-01-01", status: "Sukses" },
    { id: 4, type: "Transaksi QRIS", amount: -12500, date: "2025-03-01", status: "Sukses" },
    { id: 5, type: "Edit Transaksi", amount: null, date: "2025-01-26", status: "Gagal" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingData(false);
    }, 1500);
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this activity?");
    if (confirmed) {
      setIsLoading(true);
      setTimeout(() => {
        setActivities(activities.filter((activity) => activity.id !== id));
        setIsLoading(false);
      }, 1000);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const filteredActivities = activities.filter((activity) => activity.type.toLowerCase().includes(searchTerm.toLowerCase()));

  // skeleton loader components
  const SkeletonHeader = () => (
    <div className="animate-pulse mb-6">
      <div className="h-7 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/5"></div>
    </div>
  );

  const SkeletonSearchBar = () => <div className="mb-4 h-12 bg-gray-200 rounded-lg animate-pulse"></div>;

  const SkeletonActivity = ({ index }) => (
    <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-gray-200 p-4 rounded-xl animate-pulse mb-4 h-20"></motion.div>
  );

  const SkeletonActivities = ({ count = 5 }) => (
    <div className="space-y-0">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonActivity key={index} index={index} />
        ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          {isLoadingData || isLoading ? (
            <div className="animate-pulse">
              <SkeletonHeader />
              <SkeletonSearchBar />
              <SkeletonActivities />
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <FiSearch className="text-gray-400 w-5 h-5 mr-2" />
                <input type="text" placeholder="Search activities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full outline-none text-gray-700" />
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
                              {activity.amount === null ? <FiEdit className="w-5 h-5" /> : activity.amount < 0 ? <FiArrowDown className="w-5 h-5" /> : <FiArrowUp className="w-5 h-5" />}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">{activity.type}</h3>
                              <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium ${activity.status === "Sukses" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {activity.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <p className={`font-semibold ${activity.amount === null ? "text-gray-500" : activity.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                              {activity.amount !== null && activity.amount < 0 ? "-" : ""}
                              {activity.amount !== null
                                ? new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                  }).format(Math.abs(activity.amount))
                                : "-"}
                            </p>
                            <button onClick={() => handleDelete(activity.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No activities found</h3>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogActivityPage;
