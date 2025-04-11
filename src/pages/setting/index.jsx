import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { getUser } from "../../api/user";
import api from "../../utils/expiredApi";

const SkeletonInput = () => (
  <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md" />
);

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "BudgetIn";
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await getUser();
      setFormData({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user.data.phone || "",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      await api.post(
        "http://localhost:8000/api/profile/update",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="max-w-screen p-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Settings
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-gray-700 text-sm block font-medium">
                Name:
              </label>
              {loading ? (
                <SkeletonInput />
              ) : (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm block font-medium">
              Email:
            </label>
            {loading ? (
              <SkeletonInput />
            ) : (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            )}
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm block font-medium">
              Phone:
            </label>
            {loading ? (
              <SkeletonInput />
            ) : (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            )}
          </div>

          <div className="mt-6">
            <a
              href="/change-password"
              className="text-blue-600 hover:underline"
            >
              Change Password
            </a>
          </div>

          <button
            onClick={handleSave}
            className={`mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
              saving || loading ? "opacity-70" : ""
            }`}
            disabled={saving || loading}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
