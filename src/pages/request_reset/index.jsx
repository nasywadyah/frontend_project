import React from "react";
import { useState } from "react";
import axios from "axios";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/request-password-reset", {
        email: email,
      });

      // Simpan pesan dari response JSON
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage(error.response.data.message);
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

          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            <a href="/change-password"> Request Password Reset Link</a>
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
