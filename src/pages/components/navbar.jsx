import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { useState, useEffect } from "react";
import { getUser } from "../../api/user";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "BudgetIn";

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
    <nav className="bg-blue-500 text-white p-4 shadow-md flex justify-between items-center flex-wrap">
      <h1 className="text-xl md:text-2xl font-bold">
        {loading
          ? "Loading..."
          : error
          ? "Error fetching user"
          : `Welcome, ${user?.name}`}
      </h1>
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
