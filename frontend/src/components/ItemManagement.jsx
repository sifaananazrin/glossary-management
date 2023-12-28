import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ItemManagement() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStockUnits] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState(["kg", "count"]);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategoriesAndItems();
  }, []);

  const fetchCategoriesAndItems = async () => {
    try {
      const [categoriesResponse, itemsResponse] = await Promise.all([
        axios.get("/category/getallcategories"),
        axios.get("/item/getallitems"),
      ]);
      setCategories(categoriesResponse.data);
      setItems(itemsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onAddItem = async (event) => {
    event.preventDefault();
    const newItem = {
      name: itemName,
      description: itemDescription,
      category,
      stock,
      stockUnit: selectedUnit,
      price,
    };

    try {
      const response = await axios.post(
        "/item/additem",
        newItem
      );
      setItems([...items, response.data]);
      setItemName("");
      setItemDescription("");
      setCategory("");
      setStockUnits("");
      setSelectedUnit("");
      setPrice("");
      closeModal();
      navigate("/items");
      await fetchCategoriesAndItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const onDeleteItem = async (itemId) => {
    try {
      await axios.delete(`/item/deleteitem/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex h-auto bg-gray-100">
      <Sidebar />
      <div className="flex-1 px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full mt-8">
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-400 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add New Item
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Add New Item
              </h2>
              <form onSubmit={onAddItem}>
                <div className="mb-4">
                  <input
                    type="text"
                    id="itemName"
                    value={itemName}
                    placeholder="name"
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full border rounded-md py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="itemDescription"
                    placeholder="Description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <input
                      type="number"
                      id="stockUnits"
                      value={stock}
                      onChange={(e) => setStockUnits(e.target.value)}
                      placeholder="Enter stock units"
                      className="flex-1 shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                    <select
                      id="selectUnit"
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="ml-2 shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Select unit </option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="max-w-4xl w-full mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Item List
          </h2>
          <table className="w-full border-collapse bg-white shadow border rounded-b-lg">
            <thead>
              <tr>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Item Description</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Unit</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>{" "}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                console.log("Item:", item);
                return (
                  <tr key={item._id}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2">
                      {item.category ? item.category.name : ""}
                    </td>
                    <td className="border p-2">{item.stock}</td>
                    <td className="border p-2">{item.stockUnit}</td>
                    <td className="border p-2">{item.price}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => onDeleteItem(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                      <button className="ml-2 text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ItemManagement;
