import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/userModel.js";
import pool from "../config/db.js";

// GET /auth/register
export const getRegister = (req, res) => {
  res.render("auth/register");
};

// GET /auth/login
export const getLogin = (req, res) => {
  res.render("auth/login");
};

// POST /auth/register
export const postRegister = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      req.flash("error", "An account with that email already exists");
      return res.redirect("/auth/register");
    }

    const roleResult = await pool.query(
      "SELECT id FROM roles WHERE name = $1",
      [role]
    );
    const roleId = roleResult.rows[0]?.id;

    if (!roleId) {
      req.flash("error", "Invalid role selected");
      return res.redirect("/auth/register");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, passwordHash, roleId);

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      role: role,
    };

    req.session.save((err) => {
      if (err) return next(err);
      req.flash("success", `Welcome to Meadow Market, ${user.name}!`);
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
};

// POST /auth/login
export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    const roleResult = await pool.query(
      "SELECT name FROM roles WHERE id = $1",
      [user.role_id]
    );
    const roleName = roleResult.rows[0]?.name;

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      role: roleName,
    };

    req.session.save((err) => {
      if (err) return next(err);
      req.flash("success", `Welcome back, ${user.name}!`);
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
};

// GET /auth/logout
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
};
