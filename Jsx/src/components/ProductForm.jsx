import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/products";

function ProductForm() {
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    quantity: "",
    category: "",
    supplier: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // JSON Server yêu cầu giá và số lượng phải là số
    const productData = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    navigate("/");
  };

  return (
    <div>
      <h1>{id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h1>
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
        <button type="submit" className={id ? "btn btn-edit" : "btn btn-add"}>
          {id ? "Cập nhật" : "Thêm sản phẩm"}
        </button>
        <Link to="/" className="btn btn-cancel">
          Hủy
        </Link>
      </form>
    </div>
  );
}

export default ProductForm;
