import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { FaEdit } from "react-icons/fa";
import CategoryList from "./CategoryList";
import Sidebar from "./Sidebar";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "/category/getallcategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (categoryName) => {
    try {
      const response = await axios.post(
        "/category/addcategory",
        {
          name: categoryName,
        }
      );
      console.log(response.data);

      setCategories((prevCategories) => [
        ...prevCategories,
        response.data.survey,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryName = document.getElementById("categoryName").value;
    addCategory(categoryName);
    document.getElementById("categoryName").value = "";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-10 flex justify-center items-center">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Categories Management
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-lg p-6 mb-6"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoryName"
              >
                Category Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoryName"
                type="text"
                placeholder="Enter Category"
              />
            </div>
            <div className="flex space-x-2 mb-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-400 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center"
              >
                <FaEdit className="mr-2" /> Add Item
              </button>
            </div>
          </form>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default CategoryManagement;
