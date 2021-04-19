import express from "express";
import {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  getOrdersByTimeframe,
  sortOrdersByPaymentMethod,
  sortOrdersByNonPaid,
  sortOrdersByProvince
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
routes.route("/timeframe/:fromDate/:toDate").get(protect, isAdmin, getOrdersByTimeframe);
routes.route("/:id/pay").put(protect, updateOrderToPaid);
routes.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);
routes.route("/sortOrdersByPaymentMethod/:paymentMethod").get(protect, isAdmin, sortOrdersByPaymentMethod);
routes.route("/sortOrdersByNonPaid/:isPaid").get(protect, isAdmin, sortOrdersByNonPaid);
routes.route("/sortOrdersByProvince/:Province").get(protect, isAdmin, sortOrdersByProvince);

export default routes;
