import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">Logout</button>
        <FaUserCircle className="text-3xl" />
      </div>
    </nav>
  );
};

export default Navbar;
