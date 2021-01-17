import express from "express";
import { authUser } from "../controllers/userController.js";

const routes = express.Router();

routes.post("/login", authUser);

export default routes;
