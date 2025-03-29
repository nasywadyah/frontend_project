import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaExchangeAlt,
  FaFolder,
  FaBars,
} from "react-icons/fa";

const SidebarAdmin = () => {
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
    <aside
      className={`bg-slate-700 text-white p-5 transition-all ${
        menu ? (isCollapsed ? "w-16" : "w-64") : "w-16"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {menu && !isCollapsed && (
          <img src="/images/logo-white.png" alt="Logo" className="w-28 h-10" />
        )}
        <button
          onClick={menu && (() => setIsCollapsed(!isCollapsed))}
          className="text-white"
        >
          <FaBars />
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="flex items-center gap-3 hover:text-gray-300 transition"
            >
              <FaChartPie /> {menu && !isCollapsed && "Dashboard Utama"}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center gap-3 hover:text-gray-300 transition"
            >
              <FaUsers /> {menu && !isCollapsed && "Manage User"}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-transactions"
              className="flex items-center gap-3 hover:text-gray-300 transition"
            >
              <FaExchangeAlt /> {menu && !isCollapsed && "Manage Transaction"}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-categories"
              className="flex items-center gap-3 hover:text-gray-300 transition"
            >
              <FaFolder /> {menu && !isCollapsed && "Manage Category"}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
