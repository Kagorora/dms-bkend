import express from "express";
import {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import {
  isAdmin,
  protect,
  isSellerOrIsAdmin,
} from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes
  .route("/")
  .post(protect, addOrderItem)
  .get(protect, isAdmin, getAllOrders);
routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderById);
routes.route("/:id/pay").put(protect, updateOrderToPaid);
routes.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default routes;
