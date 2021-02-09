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

// @desc     Update Order by to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

// @desc     GET  User Order history
// @route    GET /api/orders/myorders
// @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders };
