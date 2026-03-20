import express from "express";
import { checkLogin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", checkLogin, (req, res) => {
    res.render("orders/index");
});

export default router;