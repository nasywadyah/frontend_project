const Card = ({ title, amount, color }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg text-white ${color}`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-semibold">{amount}</p>
    </div>
  );
};

export default Card;
