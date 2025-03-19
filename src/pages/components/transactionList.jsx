const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between py-2 border-b">
            <span>{transaction.description}</span>
            <span className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
              {transaction.amount < 0 ? "-" : "+"} ${Math.abs(transaction.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
