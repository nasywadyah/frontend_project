import React from "react";

const ViewTransaction = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Format tanggal
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Detail Transaksi</h2>

        <div className="space-y-3 text-sm sm:text-base">
          <div>
            <span className="font-semibold">Amount:</span>{" "}
            {formatRupiah(transaction.amount)}
          </div>
          <div>
            <span className="font-semibold">Category:</span>{" "}
            {transaction.category?.name}
          </div>
          <div>
            <span className="font-semibold">Type:</span>{" "}
            <span
              className={`font-bold ${
                transaction.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type}
            </span>
          </div>
          <div>
            <span className="font-semibold">Date:</span>{" "}
            {formatDate(transaction.transaction_date)}
          </div>
          <div>
            <span className="font-semibold">Description:</span>{" "}
            {transaction.description}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransaction;
