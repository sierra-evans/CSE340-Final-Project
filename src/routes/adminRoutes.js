import express from "express";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", checkAdmin, (req, res) => {
  res.render("admin/dashboard");
});

export default router;