import asyncHandler from "express-async-handler";
import Product from "../../database/models/productModel.js";

// @desc     Fetch all Products
// @route    Get /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  
  const keyword = req.query.keyword ? {
        name: {
          $regex: req.query.keyword,
          $options: "i"
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
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

//@desc Create create Product
// @route CREATE /api/products
// @access private Admin, Seller

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    image: "/images/sample.jpg",
    description: "sample description",
    brand: "sample brand",
    category: "sample category",
    user: req.user._id,
  });

  const { name } = product;

  const productExist = await Product.findOne({ name });

  if (productExist) {
    res.status(400);
    throw new Error("product already exist");
  }

  if (product) {
    const createdProduct = await Product.create(product);
    res.json(createdProduct);
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

// @desc Update update Product
// @route PUT /api/products/:id
// @access private Admin, Seller

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    countInStock,
    image,
    description,
    brand,
    category,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.countInStock = countInStock;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;

    const updatedUser = await product.save(product);
    res.status(200), res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

// @desc Add Review
// @route POST /api/products/:id/review
// @access private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!rating || rating < 0 || rating > 5) {
    res.status(400);
    throw new Error("rating should be between 0 and 5");
  }

  if (product) {
    const reviewExist = await product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (reviewExist) {
      res.status(400);
      throw new Error("review already created!");
    }

    const review = {
      comment,
      rating: Number(rating),
      user: req.user._id,
      name: req.user.name,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201), res.json("Review added");
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

export {
  getProducts,
  getProductById,
  removeProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
