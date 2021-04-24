import asyncHandler from "express-async-handler";
import Order from "../../database/models/orderModel.js";

const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Order.find({
    paymentMethod: 'LOAN'
  }).populate("user", "user._id name email");;

  if (loans) {
    res.json(loans);
  } else {
    res.status(404);
    throw new Error("No result found!");
  }
});

const approveLoans = asyncHandler(async (req, res) => {
    const loans = await Order.findById(req.params.id);
  
    if (loans) {
    loans.isLoanApproved = true;
      const updateOrder = await loans.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("No result found!");
    }
  });

  const getLoansByStatus = asyncHandler(async (req, res) => {
    const loans = await Order.find({
      isLoanApproved: `${req.params.loanStatus}`
    }).populate("user", "user._id name email");;
  
    if (loans) {
      res.json(loans);
    } else {
      res.status(404);
      throw new Error("No result found!");
    }
  });

export {
  getAllLoans,
  approveLoans,
  getLoansByStatus
};
