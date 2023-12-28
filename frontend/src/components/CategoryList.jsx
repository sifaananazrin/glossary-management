import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function CategoryList({ categories }) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories List</h2>
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
                  <button className="text-purple-500 hover:text-purple-600">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-600 ml-3">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;

