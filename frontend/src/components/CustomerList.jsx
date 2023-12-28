import React, { useState } from "react";

function CustomerList({ customers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(3);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(customers.length / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-6 shadow-xl rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={index}>
                {/* Customer data */}
                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  {customer.name}
                </td>
                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  {customer.email}
                </td>
                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  {customer.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-3">
        <nav className="block">
          <ul className="flex pl-0 list-none rounded my-2">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className="mx-1 px-3 py-2 bg-white border border-gray-300 text-gray-500 b hover:bg-gray-100 hover:text-gray-700"
              >
                <a
                  onClick={() => paginate(number)}
                  href="#"
                  className="cursor-pointer"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CustomerList;
