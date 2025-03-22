import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-700">
          Processing login...
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Please wait while we authenticate your account.
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
