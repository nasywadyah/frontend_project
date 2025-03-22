import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { resetPassword } from "../../api/password";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Budgeting";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const data = await resetPassword(email);
      console.log("Response dari API ke UI:", data);

      if (data && data.message) {
        setMessage(data.message);
      } else {
        setMessage("An email has been sent if the address exists.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Something went wrong.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>
        <p className="text-gray-500 text-center mb-6 text-sm mt-2">Enter your email address and we will send you a link to reset your password.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-left block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full px-4 py-2 border rounded-lg" required />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            {isLoading ? "Loading..." : "Request Reset Password"}
          </button>
        </form>

        {message && <p className={`mt-4 text-center ${isError ? "text-red-600" : "text-green-600"}`}>{message}</p>}

        <div className="text-center mt-4 text-sm">
          <p>
            Remember your password?
            <a href="/sign-in" className="text-blue-500 font-medium">
              {" "}
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPassword;
