import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("App is Running");
});

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const PORT = process.env.PORT || 5000;

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `app listening on http://localhost:${process.env.PORT}`.yellow.bold
  );
});
