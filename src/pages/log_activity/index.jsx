import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { motion } from "framer-motion";

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

  const filteredActivities = activities.filter((activity) => activity.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-4">
          <input type="text" placeholder="Search activity..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="px-4">
          {isLoadingData ? (
            <motion.div className="flex justify-center items-center py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}></motion.div>
            </motion.div>
          ) : isLoading ? (
            <motion.div className="flex justify-center items-center py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}></motion.div>
            </motion.div>
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <motion.div key={activity.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-full bg-gray-100">{activity.type.includes("Isi Saldo") ? "🔄" : "💳"}</div>
                  <div>
                    <p className="text-gray-700 font-semibold">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                    <p className={`text-xs font-semibold ${activity.status === "Sukses" ? "text-green-500" : "text-red-500"}`}>{activity.status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className={`font-semibold ${activity.amount < 0 ? "text-red-500" : "text-green-500"}`}>{activity.amount !== null ? `Rp${Math.abs(activity.amount).toLocaleString()}` : "-"}</p>
                  <button onClick={() => handleDelete(activity.id)} className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogActivityPage;
