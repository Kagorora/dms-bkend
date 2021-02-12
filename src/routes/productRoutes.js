import express from "express";
import {
  getProducts,
  getProductById,
  removeProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  protect,
  isAdmin,
  isSellerOrIsAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, isSellerOrIsAdmin, createProduct);
router.route("/:id").get(getProductById);
router
  .route("/:id")
  .delete(protect, isAdmin, removeProduct)
  .put(protect, isSellerOrIsAdmin, updateProduct);

export default router;
