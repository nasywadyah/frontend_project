import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";

const RecommendationForm = () => {
  const [formData, setFormData] = useState({
    Num_Bank_Accounts: "",
    Num_Credit_Card: "",
    Interest_Rate: "",
    Num_of_Loan: "",
    Delay_from_due_date: "",
    Num_of_Delayed_Payment: "",
    Changed_Credit_Limit: "",
    Num_Credit_Inquiries: "",
    Outstanding_Debt: "",
    Credit_Utilization_Ratio: "",
    Total_EMI_per_month: "",
    Amount_invested_monthly: "",
    Credit_Mix: "Good",
    Payment_of_Min_Amount: "Yes",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div>
        <div className="flex min-h-screen bg-gray-50">
             {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
            <div className="flex-1 flex flex-col">
            <Navbar />

            <div className="max-w-screen p-6 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Recommendation Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** Input fields */}
        {Object.keys(formData).map((key) => {
          if (key === "Credit_Mix") {
            return (
              <div key={key}>
                <label className="block text-sm font-medium">{key.replace(/_/g, " ")}</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="Good">Good</option>
                  <option value="Standard">Standard</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
            );
          } else if (key === "Payment_of_Min_Amount") {
            return (
              <div key={key}>
                <label className="block text-sm font-medium">{key.replace(/_/g, " ")}</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            );
          } else {
            return (
              <div key={key}>
                <label className="block text-sm font-medium">{key.replace(/_/g, " ")}</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            );
          }
        })}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
            </div>
        </div>
    </div>
  );
};

export default RecommendationForm;