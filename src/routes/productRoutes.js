import express from "express";
import {
  getProducts,
  getProductById,
  removeProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/:id").delete(protect, isAdmin, removeProduct);

export default router;
