import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Gaji", type: "Income" },
    { id: 2, name: "Makanan", type: "Expense" },
    { id: 3, name: "Transportasi", type: "Expense" },
  ]);

  const [newCategory, setNewCategory] = useState({ name: "", type: "Income" });
  const [editCategory, setEditCategory] = useState(null);

  // Tambah kategori
  const addCategory = () => {
    if (newCategory.name.trim() !== "") {
      setCategories([...categories, { ...newCategory, id: Date.now() }]);
      setNewCategory({ name: "", type: "Income" });
    }
  };

  // Hapus kategori
  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Edit kategori
  const updateCategory = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editCategory.id ? editCategory : cat
      )
    );
    setEditCategory(null);
  };

  return (
    <div>
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
      <Sidebar />

       {/* Main Content */}
       <div className="flex-1 flex flex-col">
       <Navbar />

       <div className="p-6">
      <h1 className="text-lg sm:text-2xl font-semibold mb-4">Category Management</h1>

      {/* Form Tambah / Edit */}
      <div className="mb-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">
          {editCategory ? "Edit Category" : "Add New Category"}
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Category Name"
            className="p-2 border rounded w-full"
            value={editCategory ? editCategory.name : newCategory.name}
            onChange={(e) =>
              editCategory
                ? setEditCategory({ ...editCategory, name: e.target.value })
                : setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <select
            className="p-2 border rounded"
            value={editCategory ? editCategory.type : newCategory.type}
            onChange={(e) =>
              editCategory
                ? setEditCategory({ ...editCategory, type: e.target.value })
                : setNewCategory({ ...newCategory, type: e.target.value })
            }
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {editCategory ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={updateCategory}
            >
              Update
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={addCategory}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Tabel Kategori */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{cat.name}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    cat.type === "Income" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {cat.type}
                </span>
              </td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditCategory(cat)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteCategory(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       </div>
        </div>
    </div>
  );
};

export default CategoryPage;