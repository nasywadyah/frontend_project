import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

const Navbar = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Welcome, {name}</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
