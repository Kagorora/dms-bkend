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

// @desc     Update Order by to delivered
// @route    PUT /api/orders/:id/deliver
// @access   Private Admin and Seller
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

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

// @desc     GET  All Orders
// @route    GET admin/api/orders
// @access   Private Admin

const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "user._id name");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

// @desc     GET  All Orders by timeframe 
// @route    GET admin/api/orders/timeframe/:from/:to 
// @access   Private Admin  

const getOrdersByTimeframe = asyncHandler(async (req, res) => {
 

  console.log('$$$$$$$$', req.params.fromDate);

  console.log('$$$$$$$$', req.params.toDate);

  const order = await Order.find({
    createdAt: {
      $gte: req.params.fromDate,
      $lt: req.params.toDate
    }
  }).populate("user", "user._id name");

  console.log('$$$$$$$$', order);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

const sortOrdersByPaymentMethod = asyncHandler(async (req, res) => {
  const order = await Order.find({ paymentMethod: req.params.paymentMethod });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

const sortOrdersByNonPaid = asyncHandler(async (req, res) => {
  const order = await Order.find({ isPaid: req.params.isPaid });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

const sortOrdersByProvince = asyncHandler(async (req, res) => {
  const order = await Order.find({ "orderAddress.Province": req.params.Province });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  getOrdersByTimeframe,
  sortOrdersByPaymentMethod,
  sortOrdersByNonPaid,
  sortOrdersByProvince
};
