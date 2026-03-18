import pool from "../config/db.js";

// Get user by email (used for login)
export const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

// Get user by id
export const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Create new user
export const createUser = async (name, email, passwordHash, roleId) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, passwordHash, roleId]
  );
  return result.rows[0];
};

// Get all users (admin)
export const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT users.*, roles.name AS role_name FROM users JOIN roles ON users.role_id = roles.id"
  );
  return result.rows;
};

// Update user role (admin)
export const updateUserRole = async (userId, roleId) => {
  const result = await pool.query(
    "UPDATE users SET role_id = $1 WHERE id = $2 RETURNING *",
    [roleId, userId]
  );
  return result.rows[0];
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  await pool.query("DELETE FROM users WHERE id = $1", [userId]);
};