import express from "express";
import {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").post(protect, addOrderItem);
routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderById);
routes.route("/:id/pay").put(protect, updateOrderToPaid);

export default routes;
