import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import useApi from "../../helper/useApi";

const CategoryPage = () => {
  const api = useApi();
  const [datacategory, setdatacategory] = useState([]);
  const [error, seterror] = useState("");
  const [idcategory, setidcategory] = useState("");
  const [namecategory, setnamecategory] = useState("");
  const [typecategory, settypecategory] = useState("income");

  const getDataCategory = async () => {
    try {
      const { data } = await api({ method: "get", url: `/api/categories` });
      setdatacategory(data.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmed) return;

    try {
      await api({ method: "delete", url: `/api/categories/${categoryId}` });
      getDataCategory();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (!namecategory.trim()) {
      seterror("Category name is required");
      return;
    }

    try {
      await api({
        method: "post",
        url: "/api/categories",
        data: {
          userid: localStorage.getItem("userid"),
          name: namecategory,
          type: typecategory,
        },
      });
      getDataCategory();
      setnamecategory("");
      settypecategory("income");
    } catch (error) {
      seterror(error.response?.data?.message);
      console.log(error.response?.data);
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    if (!namecategory.trim()) {
      seterror("Category name is required");
      return;
    }

    try {
      await api({
        method: "put",
        url: `/api/categories/${idcategory}`,
        data: {
          userid: localStorage.getItem("userid"),
          name: namecategory,
          type: typecategory,
        },
      });
      getDataCategory();
      setidcategory("");
      setnamecategory("");
      settypecategory("income");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    document.title = "Category";
    getDataCategory();
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        seterror("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-6">
            <h1 className="text-lg sm:text-2xl font-semibold mb-4">
              Category Management
            </h1>

            <div className="mb-4 p-4 bg-gray-100 rounded-md">
              <h2 className="text-lg font-semibold mb-2">
                {idcategory !== "" ? "Edit Category" : "Add New Category"}
              </h2>

              <form
                onSubmit={idcategory !== "" ? updateCategory : addCategory}
                className="flex flex-wrap gap-4"
              >
                {idcategory !== "" && (
                  <input
                    type="text"
                    placeholder="Category ID"
                    className="p-2 border rounded w-full sm:w-auto"
                    value={idcategory}
                    readOnly
                  />
                )}

                <input
                  type="text"
                  placeholder="Category Name"
                  className="p-2 border rounded w-full sm:w-auto"
                  value={namecategory}
                  onChange={(e) => setnamecategory(e.target.value)}
                />

                <select
                  className="p-2 border rounded w-full sm:w-auto"
                  value={typecategory}
                  onChange={(e) => settypecategory(e.target.value)}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                {idcategory !== "" ? (
                  <>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        setidcategory("");
                        setnamecategory("");
                        settypecategory("income");
                      }}
                    >
                      Reset
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                )}

                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>

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
                {datacategory.map((cat, index) => (
                  <tr key={cat.id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{cat.name}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          cat.type.toLowerCase() === "income"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {cat.type}
                      </span>
                    </td>
                    <td className="border p-2">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => {
                          setidcategory(cat.id);
                          setnamecategory(cat.name);
                          settypecategory(cat.type.toLowerCase());
                        }}
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
