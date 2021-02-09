import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Users from "../../database/models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await Users.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } else {
    res.status(401);
    throw new Error("Not allowed");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (req.user && req.user.userType === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not allowed");
  }
});

export { protect, isAdmin };
