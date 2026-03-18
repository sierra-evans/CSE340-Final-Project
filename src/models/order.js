import pool from "../config/db.js";

// Create a new order
export const createOrder = async (buyerId, totalPrice) => {
  const result = await pool.query(
    "INSERT INTO orders (buyer_id, total_price, status) VALUES ($1, $2, $3) RETURNING *",
    [buyerId, totalPrice, "placed"]
  );
  return result.rows[0];
};

// Add item to order
export const createOrderItem = async (orderId, productId, quantity, price) => {
  const result = await pool.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
    [orderId, productId, quantity, price]
  );
  return result.rows[0];
};

// Get all orders for a buyer
export const getOrdersByBuyer = async (buyerId) => {
  const result = await pool.query(
    "SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC",
    [buyerId]
  );
  return result.rows;
};

// Get single order by id
export const getOrderById = async (id) => {
  const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
  return result.rows[0];
};

// Get order items for an order
export const getOrderItems = async (orderId) => {
  const result = await pool.query(
    "SELECT order_items.*, products.title FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = $1",
    [orderId]
  );
  return result.rows;
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

// Get all orders (admin)
export const getAllOrders = async () => {
  const result = await pool.query(
    "SELECT orders.*, users.name AS buyer_name FROM orders JOIN users ON orders.buyer_id = users.id ORDER BY created_at DESC"
  );
  return result.rows;
};