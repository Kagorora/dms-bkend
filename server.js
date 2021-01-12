import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("App is Running");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `app listening on http://localhost:${process.env.PORT}`.yellow.bold
  );
});
