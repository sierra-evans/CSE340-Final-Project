import pool from "../config/db.js";

// Get all approved products
export const getAllProducts = async () => {
  const result = await pool.query(
    "SELECT products.*, users.name AS seller_name, categories.name AS category_name FROM products JOIN users ON products.seller_id = users.id LEFT JOIN categories ON products.category_id = categories.id WHERE products.status = $1",
    ["approved"]
  );
  return result.rows;
};

// Get single product by id
export const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT products.*, users.name AS seller_name, categories.name AS category_name FROM products JOIN users ON products.seller_id = users.id LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = $1",
    [id]
  );
  return result.rows[0];
};

// Get all products by seller
export const getProductsBySeller = async (sellerId) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE seller_id = $1",
    [sellerId]
  );
  return result.rows;
};

// Get all pending products (admin)
export const getPendingProducts = async () => {
  const result = await pool.query(
    "SELECT products.*, users.name AS seller_name FROM products JOIN users ON products.seller_id = users.id WHERE products.status = $1",
    ["pending"]
  );
  return result.rows;
};

// Create product
export const createProduct = async (sellerId, categoryId, title, description, price, stockQuantity, imageUrl) => {
  const result = await pool.query(
    'INSERT INTO products (seller_id, category_id, title, description, price, stock_quantity, status, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [sellerId, categoryId, title, description, price, stockQuantity, 'pending', imageUrl]
  );
  return result.rows[0];
};

// Update product
export const updateProduct = async (id, title, description, price, stockQuantity, categoryId, imageUrl) => {
  const result = await pool.query(
    'UPDATE products SET title = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5, image_url = $6 WHERE id = $7 RETURNING *',
    [title, description, price, stockQuantity, categoryId, imageUrl, id]
  );
  return result.rows[0];
};

// Update product status (admin approval)
export const updateProductStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE products SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

// Delete product
export const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};