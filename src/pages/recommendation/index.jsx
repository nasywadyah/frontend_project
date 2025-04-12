import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";
import { submitScoreForm } from "../../api/scores";

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

  const [resultScore, setResultScore] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitScoreForm(formData);
      console.log("Hasil dari API:", result);

      setResultScore(result.data.credit_score);
      setShowPopup(true);
    } catch (error) {
      console.error("Error submit:", error);
    } finally {
      setLoading(false);
    }
  };

  const getColorClass = (score) => {
    switch (score) {
      case "Good":
        return "text-green-600";
      case "Standard":
        return "text-yellow-500";
      case "Bad":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />

          <div className="max-w-screen p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Recommendation Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map((key) => {
                if (key === "Credit_Mix" || key === "Payment_of_Min_Amount") {
                  const options =
                    key === "Credit_Mix"
                      ? ["Good", "Standard", "Bad"]
                      : ["Yes", "No"];

                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium">
                        {key.replace(/_/g, " ")}
                      </label>
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium">
                        {key.replace(/_/g, " ")}
                      </label>
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
                disabled={loading}
                className={`w-full py-2 rounded-md transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg relative w-96">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Credit Score Result
            </h2>
            <p className="text-center text-lg">
              <span className="font-bold text-black">Score:</span>{" "}
              <span className={`font-bold ${getColorClass(resultScore)}`}>
                {resultScore}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;
