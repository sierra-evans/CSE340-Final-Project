import pool from "../config/db.js";

// Get all reviews for a product
export const getReviewsByProduct = async (productId) => {
  const result = await pool.query(
    "SELECT reviews.*, users.name AS reviewer_name FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.product_id = $1 ORDER BY created_at DESC",
    [productId]
  );
  return result.rows;
};

// Get all reviews by a user
export const getReviewsByUser = async (userId) => {
  const result = await pool.query(
    "SELECT reviews.*, products.title AS product_title FROM reviews JOIN products ON reviews.product_id = products.id WHERE reviews.user_id = $1",
    [userId]
  );
  return result.rows;
};

// Create a review
export const createReview = async (userId, productId, rating, comment) => {
  const result = await pool.query(
    "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, productId, rating, comment]
  );
  return result.rows[0];
};

// Update a review
export const updateReview = async (id, rating, comment) => {
  const result = await pool.query(
    "UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *",
    [rating, comment, id]
  );
  return result.rows[0];
};

// Delete a review
export const deleteReview = async (id) => {
  await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
};