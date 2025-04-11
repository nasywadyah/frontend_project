export const submitScoreForm = async (formData) => {
    const token = localStorage.getItem("token");
  
    const response = await fetch("http://localhost:8000/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        Num_Bank_Accounts: Number(formData.Num_Bank_Accounts),
        Num_Credit_Card: Number(formData.Num_Credit_Card),
        Interest_Rate: Number(formData.Interest_Rate),
        Num_of_Loan: Number(formData.Num_of_Loan),
        Delay_from_due_date: Number(formData.Delay_from_due_date),
        Num_of_Delayed_Payment: Number(formData.Num_of_Delayed_Payment),
        Changed_Credit_Limit: Number(formData.Changed_Credit_Limit),
        Num_Credit_Inquiries: Number(formData.Num_Credit_Inquiries),
        Outstanding_Debt: Number(formData.Outstanding_Debt),
        Credit_Utilization_Ratio: Number(formData.Credit_Utilization_Ratio),
        Total_EMI_per_month: Number(formData.Total_EMI_per_month),
        Amount_invested_monthly: Number(formData.Amount_invested_monthly),
        Credit_Mix: formData.Credit_Mix,
        Payment_of_Min_Amount: formData.Payment_of_Min_Amount,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Gagal mengirim data ke server");
    }
  
    return await response.json();
  };
  