import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Gunakan untuk redirect
import { motion } from "framer-motion";
import {
  FaUsers,
  FaExchangeAlt,
  FaListAlt,
  FaClipboardList,
} from "react-icons/fa";
import Navbar from "../components/navbar";
import SidebarAdmin from "../components/SidebarAdmin";
import Card from "../components/card";
import UserList from "../components/UserList";
import LogList from "../components/LogList";
import {
  getUsers,
  getAllTransactions,
  getAllCategories,
  getAllLogs,
} from "../../api/admin";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Dashboard";

    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          usersResponse,
          transactionsResponse,
          categoriesResponse,
          logsResponse,
        ] = await Promise.all([
          getUsers().catch(() => ({ data: [] })),
          getAllTransactions().catch(() => ({ data: [] })),
          getAllCategories().catch(() => ({ data: [] })),
          getAllLogs().catch(() => ({ data: [] })),
        ]);

        setUsers(usersResponse.data);
        setTransactions(transactionsResponse.data);
        setCategories(categoriesResponse.data);
        setLogs(logsResponse.data);
        console.log(
          "Data:",
          usersResponse.data,
          transactionsResponse.data,
          categoriesResponse.data,
          logsResponse.data
        );
      } catch (err) {
        setError("Gagal mengambil data admin");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Jika belum login, tampilkan pesan dan redirect ke login setelah 3 detik
  useEffect(() => {
    if (error === "Belum login! Silakan login terlebih dahulu.") {
      setTimeout(() => navigate("/sign-in"), 3000);
    }
  }, [error, navigate]);

  if (error === "Belum login! Silakan login terlebih dahulu.") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            <Navbar name="Admin" />

            {/* Statistik */}
            <div className="p-6 flex flex-wrap justify-between gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg flex-1 min-w-[250px] max-w-[320px]"
              >
                <Card
                  title="Total Users"
                  amount={users.length}
                  icon={<FaUsers className="text-white text-xl" />}
                  color="bg-blue-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg flex-1 min-w-[250px] max-w-[320px]"
              >
                <Card
                  title="Total Transactions"
                  amount={transactions.length}
                  icon={<FaExchangeAlt className="text-white text-xl" />}
                  color="bg-green-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg flex-1 min-w-[250px] max-w-[320px]"
              >
                <Card
                  title="Total Categories"
                  amount={categories.length}
                  icon={<FaListAlt className="text-white text-xl" />}
                  color="bg-yellow-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg flex-1 min-w-[250px] max-w-[320px]"
              >
                <Card
                  title="Total Logs"
                  amount={logs.length}
                  icon={<FaClipboardList className="text-white text-xl" />}
                  color="bg-red-500"
                />
              </motion.div>
            </div>

            {/* Daftar Pengguna Terbaru & Log Aktivitas */}
            <div className="p-6 flex flex-wrap justify-between gap-6">
              <motion.div
                className="bg-white p-5 rounded-lg shadow-lg flex-1 min-w-[300px] max-w-[500px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Recent Users
                </h3>
                {users.length > 0 ? (
                  <UserList users={users.slice(0, 5)} />
                ) : (
                  <p className="text-gray-500">No users found</p>
                )}
              </motion.div>

              <motion.div
                className="bg-white p-5 rounded-lg shadow-lg flex-1 min-w-[300px] max-w-[500px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Recent Logs
                </h3>
                {logs.length > 0 ? (
                  <LogList logs={logs.slice(0, 5)} />
                ) : (
                  <p className="text-gray-500">No logs found</p>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
