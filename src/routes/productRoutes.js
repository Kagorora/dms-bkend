import express from "express";
import {
  getProducts,
  getProductById,
  removeProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import {
  protect,
  isAdmin,
  isSellerOrIsAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:id/review").post(protect, createProductReview);

router
  .route("/:id")
  .delete(protect, isAdmin, removeProduct)
  .put(protect, isSellerOrIsAdmin, updateProduct);

router
  .route("/")
  .get(getProducts)
  .post(protect, isSellerOrIsAdmin, createProduct);
router.route("/:id").get(getProductById);

export default router;
