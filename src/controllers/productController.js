import asyncHandler from "express-async-handler";
import Product from "../../database/models/productModel.js";

// @desc     Fetch all Products
// @route    Get /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc     Fetch single Products
// @route    Get /api/products/:id
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc     Fetch delete Product
// @route    DELETE /api/products/:id
// @access   private Admin
const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove(product);
    res.json("product deleted");
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

export { getProducts, getProductById, removeProduct };
