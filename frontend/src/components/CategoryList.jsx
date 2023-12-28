import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "../api/axios";
function CategoryList({ categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    handleEditSubmit();
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/category/deletecategory/${id}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "/category/editcategory",
        {
          id: selectedCategory._id,
          newName: selectedCategory.name,
        }
      );

      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Categories List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  {category.name}
                </td>
                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm flex items-center">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-600 ml-3"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white p-6 rounded-lg shadow-xl z-10 w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
            <form onSubmit={handleEditSubmit}>
              {" "}
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Edit Category Name"
                  value={selectedCategory.name}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
