import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/navbar";

const SettingsPage = () => {
  useEffect(() => {
    document.title = "BudgetIn";
  }, []);

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    currency: "USD",
    language: "English",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="max-w-screen p-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Settings</h2>

          <div className="mt-6">
            <div>
              <label className="text-gray-700 text-sm block text-left font-medium">First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm block text-left font-medium">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300" />
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm block text-left font-medium">Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300" />
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm block text-left font-medium">Currency:</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="IDR">IDR (Rp)</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm block text-left font-medium">Language:</label>
            <select name="language" value={formData.language} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              <option value="English">English</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          <div className="mt-6">
            <a href="/change-password" className="text-blue-600 hover:underline">
              Change Password
            </a>
          </div>

          <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
