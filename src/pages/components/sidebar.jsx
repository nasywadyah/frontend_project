import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaMoneyBill, FaCog, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1030);
  const [menu, setMenu] = useState(window.innerWidth >= 1030);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1030;
      setIsCollapsed(isMobile);
      setMenu(!isMobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1030) {
      setIsCollapsed(true);
      setMenu(false);
    }
  }, []);
  return (
    <aside className={` bg-slate-700 text-white p-5 transition-all ${menu ? isCollapsed ? "w-16" : "w-64": "w-16"}`}>
      <div className="flex items-center justify-between mb-6">
        {menu && (!isCollapsed && <h2 className="text-xl font-bold">Menu</h2>)}
        <button onClick={menu && (() => setIsCollapsed(!isCollapsed))} className="text-white">
          <FaBars />
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaChartPie /> {menu && (!isCollapsed && "Dashboard")}
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaMoneyBill /> {menu && (!isCollapsed && "Transactions")}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 hover:text-gray-300 transition">
              <FaCog /> {menu && (!isCollapsed && "Settings")}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
