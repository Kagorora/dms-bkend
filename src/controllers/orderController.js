import asyncHandler from "express-async-handler";
import Order from "../../database/models/orderModel.js";

// @desc     add Order
// @route    POST /api/orders
// @access   Private
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    orderAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("empty cart");
    return;
  } else {
    const order = new Order({
      orderItems,
      orderAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc     get Order by Id
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export { addOrderItem, getOrderById };
