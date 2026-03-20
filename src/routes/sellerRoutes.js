import express from "express";
import { checkSeller } from "../middleware/auth.js";

const router = express.Router();

router.get("/products", checkSeller, (req, res) => {
  res.render("seller/dashboard");
});

export default router;