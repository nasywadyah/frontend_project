const TransactionList = ({ transactions }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between py-2 border-b"
          >
            <span>{transaction.description}</span>
            <span
              className={
                transaction.type === "expense"
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {transaction.type === "expense" ? "-" : ""}
              {formatRupiah(transaction.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
