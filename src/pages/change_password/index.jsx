import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate(); // perbaiki dari "navigat"
  const [statusHide, setStatusHide] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const togglePasswordVisibility = () => {
    setStatusHide(!statusHide);
  };

  useEffect(() => {
    document.title = "BudgetIn - Change Password";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/password/change",
        {
          current_password: currentPassword,
          new_password: password,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Password updated successfully");
      setIsError(false);
      setPassword("");
      setConfirmPassword("");
      setCurrentPassword("");

      // ✅ Redirect ke dashboard setelah sukses
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update password");
      setIsError(true);
    }
  };

  return (
    <div className="flex w-full justify-center mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <p className="text-xl font-semibold text-center">Set a New Password</p>
        <p className="text-sm text-center mb-8 text-gray-500">
          Create a new password. Ensure it differs from previous ones for
          security.
        </p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <label className="text-left block text-gray-700 font-medium text-sm">
              Current Password:
            </label>
            <div
              className="text-xs opacity-60 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {statusHide ? "👁 Unhide" : "🙈 Hide"}
            </div>
          </div>
          <input
            className="border-2 border-solid rounded-lg pl-4 h-10 text-sm mt-1"
            type={statusHide ? "password" : "text"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter Your Current Password"
            required
          />

          <div className="flex justify-between items-center mt-4">
            <label className="text-left block text-gray-700 font-medium text-sm">
              New Password:
            </label>
            <div
              className="text-xs opacity-60 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {statusHide ? "👁 Unhide" : "🙈 Hide"}
            </div>
          </div>
          <input
            className="border-2 border-solid rounded-lg pl-4 h-10 text-sm mt-1"
            type={statusHide ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your New Password"
            required
          />

          <label className="text-left block text-gray-700 font-medium text-sm mt-4">
            Confirm New Password:
          </label>
          <input
            className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm mt-1"
            type={statusHide ? "password" : "text"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Your New Password"
            required
          />

          {message && (
            <p
              className={`text-sm text-center ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 rounded-lg mt-6 h-10 text-white font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
