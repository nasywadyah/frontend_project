import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaMoneyBill, FaCog, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={` bg-slate-700 text-white p-5 transition-all ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h2 className="text-xl font-bold">Menu</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white">
          <FaBars />
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaChartPie /> {!isCollapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaMoneyBill /> {!isCollapsed && "Transactions"}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaCog /> {!isCollapsed && "Settings"}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
