const express = require("express");
const app = express();
const port = 5000;

// --- Cấu hình ---
// Sử dụng EJS làm view engine
app.set("view engine", "ejs");
// Cho phép Express phục vụ các file tĩnh từ thư mục 'public' (cho CSS, JS, ảnh)
app.use(express.static("public"));
// Middleware để xử lý dữ liệu từ form (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// --- Dữ liệu tạm thời (thay cho database) ---
let products = [
  {
    id: 1,
    product_name: "Laptop Dell XPS",
    price: 35000000,
    quantity: 10,
    category: "Laptop",
    supplier: "Dell Inc.",
  },
  {
    id: 2,
    product_name: "Bàn phím cơ",
    price: 2500000,
    quantity: 50,
    category: "Phụ kiện",
    supplier: "Logitech",
  },
  {
    id: 3,
    product_name: "Màn hình LG 27 inch",
    price: 7000000,
    quantity: 25,
    category: "Màn hình",
    supplier: "LG Electronics",
  },
];
let nextId = 4; // Biến để tạo ID cho sản phẩm tiếp theo

// --- Định tuyến (Routes) ---

// 1. READ: Hiển thị danh sách tất cả sản phẩm
app.get("/", (req, res) => {
  res.render("index", { products: products });
});

// 2. CREATE (Part 1): Hiển thị form để thêm sản phẩm mới
app.get("/add", (req, res) => {
  res.render("add-product");
});

// 2. CREATE (Part 2): Xử lý dữ liệu từ form và thêm sản phẩm
app.post("/add", (req, res) => {
  const newProduct = {
    id: nextId++,
    product_name: req.body.product_name,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity),
    category: req.body.category,
    supplier: req.body.supplier,
  };
  products.push(newProduct);
  res.redirect("/"); // Chuyển hướng về trang chủ sau khi thêm
});

// 3. UPDATE (Part 1): Hiển thị form chỉnh sửa với thông tin sản phẩm cũ
app.get("/edit/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.render("edit-product", { product: product });
  } else {
    res.status(404).send("Không tìm thấy sản phẩm");
  }
});

// 3. UPDATE (Part 2): Cập nhật thông tin sản phẩm
app.post("/edit/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = {
      id: productId,
      product_name: req.body.product_name,
      price: parseFloat(req.body.price),
      quantity: parseInt(req.body.quantity),
      category: req.body.category,
      supplier: req.body.supplier,
    };
    res.redirect("/");
  } else {
    res.status(404).send("Không tìm thấy sản phẩm để cập nhật");
  }
});

// 4. DELETE: Xóa sản phẩm
app.get("/delete/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter((p) => p.id !== productId);
  res.redirect("/");
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
