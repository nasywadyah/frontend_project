import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaArrowDown, FaArrowUp } from "react-icons/fa";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import TransactionList from "../components/transactionList.jsx";
import NotificationCard from "../components/notificationCard";
import IncomeExpensePieChart from "../components/IncomeExpensePieChart";
import { getUser } from "../../api/user";
import { getTransactions } from "../../api/transactions";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/sign-in";
    }
    document.title = "BudgetIn";
  }, []);

  useEffect(() => {
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

        let totalIncome = 0;
        let totalExpense = 0;
        transactionResponse.data.forEach((trx) => {
          if (trx.type === "income") {
            totalIncome += parseFloat(trx.amount);
          } else if (trx.type === "expense") {
            totalExpense += parseFloat(trx.amount);
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

  return (
    <div className="flex lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {/* Navbar */}
            <Navbar />

            {/* Ringkasan Keuangan */}
            <div className="p-6 flex flex-col md:flex-row flex-wrap gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg w-full sm:w-[250px] md:max-w-[320px]"
              >
                <Card
                  title="Income"
                  amount={formatRupiah(income)}
                  icon={<FaArrowUp className="text-white text-xl" />}
                  color="bg-green-500"
                  className="h-32 p-4 flex items-center"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg w-full sm:w-[250px] md:max-w-[320px]"
              >
                <Card
                  title="Expense"
                  amount={formatRupiah(expense)}
                  icon={<FaArrowDown className="text-white text-xl" />}
                  color="bg-red-500"
                  className="h-32 p-4 flex items-center"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg w-full sm:w-[250px] md:max-w-[320px]"
              >
                <Card
                  title="Balance"
                  amount={formatRupiah(income - expense)}
                  icon={<FaMoneyBillWave className="text-white text-xl" />}
                  color="bg-blue-500"
                  className="h-32 p-4 flex items-center"
                />
              </motion.div>
            </div>

            {/* Transaksi & Grafik */}
            <div className="p-6 flex flex-col lg:flex-row gap-6">
              {/* Daftar Transaksi */}
              <motion.div
                className="bg-white p-5 rounded-lg shadow-lg h-[300px] overflow-auto w-full lg:w-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Recent Transactions
                </h3>
                {transactions.length > 0 ? (
                  <TransactionList transactions={transactions} />
                ) : (
                  <p className="text-gray-500">No transactions found</p>
                )}
              </motion.div>

              {/* Grafik Pie Chart */}
              <motion.div
                className="bg-white p-5 rounded-lg shadow-lg h-[300px] w-full lg:w-1/2 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <IncomeExpensePieChart income={income} expense={expense} />
              </motion.div>
            </div>

            {/* Notifikasi */}
            <motion.div
              className="p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <NotificationCard
                message="New transaction added!"
                type="success"
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
