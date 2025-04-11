import { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    min_amount: "",
    max_amount: "",
    date_range: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Transactions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            <option value="Gaji">Gaji</option>
            <option value="Makanan">Makanan</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Hiburan">Hiburan</option>
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Min Amount Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
          <input type="number" name="min_amount" value={filters.min_amount} onChange={handleFilterChange} placeholder="Min Amount" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Max Amount Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
          <input type="number" name="max_amount" value={filters.max_amount} onChange={handleFilterChange} placeholder="Max Amount" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select name="date_range" value={filters.date_range} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Time</option>
            <option value="1day">Today</option>
            <option value="3days">Last 3 Days</option>
            <option value="1week">Last Week</option>
            <option value="1month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            const resetFilters = {
              category: "",
              type: "",
              min_amount: "",
              max_amount: "",
              date_range: "",
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
