import express from "express";
import {
  authUser,
  getProfile,
  userSignUp,
  updateProfile
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.post("/signup", userSignUp);
routes.post("/login", authUser);
routes.route("/profile").get(protect, getProfile).put(protect, updateProfile);

export default routes;
