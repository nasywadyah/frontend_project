import React, { useEffect, useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [statusHide, setStatusHide] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const click_pass = () => {
    setStatusHide(!statusHide);
  };

  useEffect(() => {
    document.title = "Bugdetin";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/change-password",
        {
          password,
        }
      );

      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update password");
      setIsError(true);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center mt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <p className="text-xl font-semibold text-center">
            Set a New Password
          </p>
          <p className="text-sm text-center mb-8 text-gray-500">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-left block text-gray-700 font-medium text-sm">
              New Password:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 h-10 text-sm"
              type={statusHide ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your New Password"
              required
            />
            <p className="text-left mb-3 text-xs text-[#666666]">
              *Use 8 or more characters with a mix of letters & numbers
            </p>

            <label className="text-left block text-gray-700 font-medium text-sm">
              Confirm New Password:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm"
              type={statusHide ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Your Confirm New Password"
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
              className="bg-blue-500 hover:bg-blue-600 rounded-lg mt-7 h-10 text-white font-semibold"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
