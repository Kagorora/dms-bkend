import express from "express";
import { addOrderItem, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").post(protect, addOrderItem);
routes.route("/:id").get(protect, getOrderById);

export default routes;
