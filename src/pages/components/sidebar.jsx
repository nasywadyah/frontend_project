import { Link } from "react-router-dom";
import { FaChartPie, FaMoneyBill, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaChartPie /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaMoneyBill /> Transactions
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaCog /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
