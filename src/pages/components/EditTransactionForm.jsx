import React, { useState } from "react";

const EditTransactionForm = ({ txn, onClose, onSave }) => {
  const [form, setForm] = useState(txn);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input sebelum menyimpan
    if (!form.amount || !form.category || !form.type || !form.date || !form.description) {
      setError("Semua kolom harus diisi!");
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Transaksi</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Amount</span>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
          </label>

          <label className="block">
            Category
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select Category</option>
              <option value="Gaji">Gaji</option>
              <option value="Makanan">Makanan</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Hiburan">Hiburan</option>
            </select>
          </label>

          <label className="block">
            Type
            <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </label>

          <label className="block">
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
          </label>

          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded mt-1" rows="3" placeholder="Tambahkan deskripsi transaksi" required />
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400" disabled={!form.amount || !form.category || !form.type || !form.date || !form.description}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionForm;
