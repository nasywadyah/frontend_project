import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaArrowDown, FaArrowUp } from "react-icons/fa";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import TransactionList from "../components/transactionList";
import NotificationCard from "../components/notificationCard";
import IncomeExpensePieChart from "../components/IncomeExpensePieChart"; // Import Pie Chart
import { getUser } from "../../api/user";
import { getTransactions } from "../../api/transactions";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect jika tidak ada token
  /*useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/sign-in";
    }
    document.title = "BudgetIn";
  }, []);*/

  useEffect(() => {
    document.title = "BudgetIn";

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionResponse = await getTransactions();
        setTransactions(transactionResponse.data);

        // Hitung total pemasukan & pengeluaran
        let totalIncome = 0;
        let totalExpense = 0;
        transactionResponse.data.forEach((trx) => {
          if (trx.amount > 0) {
            totalIncome += trx.amount;
          } else {
            totalExpense += Math.abs(trx.amount);
          }
        });

        setIncome(totalIncome);
        setExpense(totalExpense);
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const mos = motion;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {/* Navbar */}
            <Navbar name={user ? user.name : "Guest"} />

            {/* Ringkasan Keuangan */}
            <div className="p-6 flex flex-wrap justify-between gap-6">
              <mos.div whileHover={{ scale: 1.05 }} className="shadow-lg flex-1 min-w-[250px] max-w-[320px]">
                <Card title="Income" amount={formatRupiah(income)} icon={<FaArrowUp className="text-white text-xl" />} color="bg-green-500" className="h-32 p-4 flex items-center" />
              </mos.div>

              <mos.div whileHover={{ scale: 1.05 }} className="shadow-lg flex-1 min-w-[250px] max-w-[320px]">
                <Card title="Expense" amount={formatRupiah(expense)} icon={<FaArrowDown className="text-white text-xl" />} color="bg-red-500" className="h-32 p-4 flex items-center" />
              </mos.div>

              <mos.div whileHover={{ scale: 1.05 }} className="shadow-lg flex-1 min-w-[250px] max-w-[320px]">
                <Card title="Balance" amount={formatRupiah(income - expense)} icon={<FaMoneyBillWave className="text-white text-xl" />} color="bg-blue-500" className="h-32 p-4 flex items-center" />
              </mos.div>
            </div>

            {/* Transaksi & Grafik */}
            <div className="p-6 flex flex-wrap justify-between gap-6">
              {/* Daftar Transaksi */}
              <mos.div className="bg-white p-5 rounded-lg shadow-lg h-[300px] overflow-auto flex-1 min-w-[300px] max-w-[500px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Transactions</h3>
                {transactions.length > 0 ? <TransactionList transactions={transactions} /> : <p className="text-gray-500">No transactions found</p>}
              </mos.div>

              {/* Grafik Pie Chart */}
              <mos.div className="bg-white p-5 rounded-lg shadow-lg flex items-center justify-center h-[300px] flex-1 min-w-[300px] max-w-[500px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                <IncomeExpensePieChart income={income} expense={expense} />
              </mos.div>
            </div>

            {/* Notifikasi */}
            <mos.div className="p-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <NotificationCard message="New transaction added!" type="success" />
            </mos.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
