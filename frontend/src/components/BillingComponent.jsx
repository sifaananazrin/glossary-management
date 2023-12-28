import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";

function BillingComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", quantity: 0, price: 10.0 },
    { id: 2, name: "Item 2", quantity: 0, price: 20.0 },
    { id: 3, name: "Item 3", quantity: 0, price: 30.0 },
  ]);
  const [customers, setCustomers] = useState([
    { id: 1, name: "Customer 1" },
    { id: 2, name: "Customer 2" },
    { id: 3, name: "Customer 3" },
  ]);
  const [paymentMethod, setPaymentMethod] = useState({
    upi: false,
    cash: false,
    cashAndUpi: false,
  });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  }, [items]);

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(filteredItems);

    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCustomers(filteredCustomers);
  };

  const handleIncrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod({
      ...paymentMethod,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="flex h-auto bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="mx-8 my-4">
          <div className="max-w-lg mx-auto p-5 bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-6">Billing</h1>

            <div className="flex mb-5">
              <input
                type="text"
                placeholder="Search for items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
              >
                <FaSearch />
              </button>
            </div>

            {/* Items List */}
            <div className="border border-gray-200 rounded-md p-2 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border-b border-gray-300 last:border-b-0"
                >
                  <span className="font-bold">{item.name}</span>
                  <span>Quantity: {item.quantity}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="bg-red-500 text-white p-1 rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      <FaMinus />
                    </button>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="bg-green-500 text-white p-1 rounded-md hover:bg-green-700 focus:outline-none"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-6 p-4 border-t border-gray-300 flex justify-between items-center">
              <span className="text-xl font-semibold">Total Amount:</span>
              <span className="text-xl font-semibold">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Customer Search */}
            <h2 className="text-xl font-bold mb-4">Customer Search</h2>
            <div className="flex mb-5">
              <input
                type="text"
                placeholder="Search for customers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-700 focus:outline-none"
              >
                <FaSearch />
              </button>
            </div>

            {/* Customers List */}
            <div className="border border-gray-200 rounded-md p-2 mb-6">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex justify-between items-center p-2 border-b border-gray-300 last:border-b-0"
                >
                  <span className="font-bold">{customer.name}</span>
                  <button className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-700 focus:outline-none">
                    Select
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="upi"
                    checked={paymentMethod.upi}
                    onChange={handlePaymentChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">UPI</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="cash"
                    checked={paymentMethod.cash}
                    onChange={handlePaymentChange}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <span className="text-gray-700">Cash</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="cashAndUpi"
                    checked={paymentMethod.cashAndUpi}
                    onChange={handlePaymentChange}
                    className="form-checkbox h-5 w-5 text-purple-600"
                  />
                  <span className="text-gray-700">Cash & UPI</span>
                </label>
              </div>
            </div>
            <button className="bg-green-500 text-white px-2 py-2 w-full rounded-md hover:bg-green-700 focus:outline-none">
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingComponent;
