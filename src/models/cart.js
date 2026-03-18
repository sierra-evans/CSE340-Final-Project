import pool from "../config/db.js";

// Get cart items for a user
export const getCartByUser = async (userId) => {
  const result = await pool.query(
    "SELECT cart_items.*, products.title, products.price, products.stock_quantity FROM cart_items JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = $1",
    [userId]
  );
  return result.rows;
};

// Add item to cart
export const addToCart = async (userId, productId, quantity) => {
  const result = await pool.query(
    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
    [userId, productId, quantity]
  );
  return result.rows[0];
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
  await pool.query("DELETE FROM cart_items WHERE id = $1", [cartItemId]);
};

// Clear entire cart for a user
export const clearCart = async (userId) => {
  await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
};