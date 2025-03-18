const NotificationCard = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return <div className={`p-4 rounded-lg text-white ${bgColor}`}>{message}</div>;
};

export default NotificationCard;
