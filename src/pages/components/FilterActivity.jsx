import { useState } from "react";

const FilterActivity = ({ onApplyFilter }) => {
  const [filters, setFilters] = useState({
    month: "",
    amount: "",
    type: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    onApplyFilter(filters);
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Bulan</span>
        <select name="month" value={filters.month} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">Semua</option>
          <option value="01">Januari</option>
          <option value="02">Februari</option>
          <option value="03">Maret</option>
          <option value="04">April</option>
          <option value="05">Mei</option>
          <option value="06">Juni</option>
          <option value="07">Juli</option>
          <option value="08">Agustus</option>
          <option value="09">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Nominal</span>
        <input type="number" name="amount" value={filters.amount} onChange={handleChange} placeholder="Masukkan nominal" className="w-full p-2 border border-gray-300 rounded-lg" />
      </label>

      <label className="block">
        <span className="text-gray-700">Jenis Transaksi</span>
        <select name="type" value={filters.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">Semua</option>
          <option value="Isi Saldo">Isi Saldo</option>
          <option value="Pembelian">Pembelian</option>
          <option value="Transaksi QRIS">Transaksi QRIS</option>
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Status</span>
        <select name="status" value={filters.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">Semua</option>
          <option value="Sukses">Sukses</option>
          <option value="Gagal">Gagal</option>
        </select>
      </label>

      <button onClick={handleApplyFilter} className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
        Terapkan
      </button>
    </div>
  );
};

export default FilterActivity;
