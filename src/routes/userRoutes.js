import express from "express";
import {
  authUser,
  getProfile,
  userSignUp,
  updateProfile,
  getAllUsers,
  removeUser,
  getUserById,
  updateUsersProfile,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").get(protect, isAdmin, getAllUsers);
routes.post("/signup", userSignUp);
routes.post("/login", authUser);
routes.route("/profile").get(protect, getProfile).put(protect, updateProfile);
routes
  .route("/:id")
  .delete(protect, isAdmin, removeUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUsersProfile);

export default routes;
