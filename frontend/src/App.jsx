import React from "react";
import { Routes, Route } from "react-router-dom";
import CategoryManagement from "./components/CategoryManagement";
import HomeScreen from "./components/HomeScreen";
import Customer from "./components/CustomerForm";
import Billing from "./components/BillingComponent";
import ItemManagement from "./components/ItemManagement";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/category" element={<CategoryManagement />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/items" element={<ItemManagement/>} />
      </Routes>
    </>
  );
}
