import express from "express";
import { addOrderItem } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").post(protect, addOrderItem);

export default routes;
