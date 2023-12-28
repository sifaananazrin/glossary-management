import React from "react";
import {
  FaRegListAlt,
  FaUser,
  FaShoppingBasket,
  FaChartPie,
  FaStore,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-green-400 to-green-600 p-5 text-white fixed">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="mb-12 text-xl font-bold flex items-center">
            <FaStore className="mr-2" /> Shop Management
          </div>
          <nav>
            <ul className="space-y-4">
              <li>
                <NavLink
                  exact
                  to="/items"
                  activeClassName="text-yellow-300"
                  className="flex items-center py-2 mb-10"
                >
                  <FaShoppingBasket className="mr-5" />
                  <span className="ml-4">Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/category"
                  activeClassName="text-yellow-300"
                  className="flex items-center py-2 mb-10" 
                >
                  <FaRegListAlt className="mr-5" />
                  <span className="ml-4">Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/customer"
                  activeClassName="text-yellow-300"
                  className="flex items-center py-2 mb-10"
                >
                  <FaUser className="mr-5" />
                  <span className="ml-4">Customer</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/billing"
                  activeClassName="text-yellow-300"
                  className="flex items-center py-2 mb-10"
                >
                  <FaChartPie className="mr-5" />
                  <span className="ml-4">Billing</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
