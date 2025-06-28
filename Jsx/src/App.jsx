import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct"; // Import component mới
import EditProduct from "./components/EditProduct"; // Import component mới
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />{" "}
          {/* Route cho trang Thêm */}
          <Route path="/edit/:id" element={<EditProduct />} />{" "}
          {/* Route cho trang Sửa */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
