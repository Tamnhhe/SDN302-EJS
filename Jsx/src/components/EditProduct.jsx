import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:3001/products";

function EditProduct() {
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    quantity: "",
    category: "",
    supplier: "",
  });
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  // Hook để lấy dữ liệu sản phẩm cần sửa khi component được render
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]); // Chạy lại khi id thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
    };

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    navigate("/"); // Chuyển về trang chủ sau khi sửa
  };

  return (
    <div>
      <h1>Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Số lượng:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Danh mục:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nhà cung cấp:</label>
          <input
            type="text"
            name="supplier"
            value={product.supplier}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-edit">
          Cập nhật
        </button>
        <Link to="/" className="btn btn-cancel">
          Hủy
        </Link>
      </form>
    </div>
  );
}

export default EditProduct;
