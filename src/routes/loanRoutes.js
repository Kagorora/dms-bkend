import express from "express";
import { getAllLoans, approveLoans, getLoansByStatus } from "../controllers/laonsController.js";
import {
  isAdmin,
  protect,
  isSellerOrIsAdmin,
} from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/All").get(protect, isAdmin, getAllLoans);
routes.route("/approve/:id").put(protect, isAdmin, approveLoans);
routes.route("/:loanStatus").get(protect, isAdmin, getLoansByStatus);

export default routes;
