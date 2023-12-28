import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import CustomerList from "./CustomerList";

function CustomerForm() {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "/customer/getallcustomers"
      );
      setCustomers(response.data);
    } catch (error) {
      toast.error("Failed to fetch customers. Please try again.");
      console.error("There was an error fetching the customer data:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = {
      name: customerName,
      email: customerEmail,
      phone: customerNumber,
    };

    try {
      const response = await axios.post(
        "/customer/addcustomer",
        customerData
      );
      toast.success("Customer added successfully!");
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerNumber("");
      fetchCustomers();
    } catch (error) {
      toast.error("Failed to add customer. Please try again.");
      console.error("There was an error submitting the customer data:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex justify-center items-center p-10 overflow-auto">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Customer Information
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-lg p-6 mb-6 w-full max-w-3xl"
          >
            <div className="mb-4">
              <label
                htmlFor="customerName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="customerEmail"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="customerEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="customerNumber"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="customerNumber"
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-400 text-white font-bold py-2 px-4 rounded w-full"
              >
                Submit
              </button>
            </div>
          </form>
          <CustomerList customers={customers} />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CustomerForm;
