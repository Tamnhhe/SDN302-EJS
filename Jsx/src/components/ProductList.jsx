import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001/products";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchProducts(); // Tải lại danh sách
    }
  };

  return (
    <div>
      <h1>Danh sách Sản phẩm</h1>
      <Link to="/add" className="btn btn-add">
        Thêm sản phẩm mới
      </Link>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá (VND)</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Nhà cung cấp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.price.toLocaleString("vi-VN")}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>{product.supplier}</td>
              <td>
                <Link to={`/edit/${product.id}`} className="btn btn-edit">
                  Sửa
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-delete"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
